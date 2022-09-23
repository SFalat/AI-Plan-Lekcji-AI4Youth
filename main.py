import json
import os
import platform
import sys
import eel

matrix = [[0 for i in range(0, 10)] for j in range(0, 10)]

# Use the latest version of Eel from parent directory
sys.path.insert(1, '../../')


# test


@eel.expose  # Expose function to JavaScript
def say_hello_py(x):
    """Print message from JavaScript on app initialization, then call a JS function."""
    print('Hello from %s' % x)  # noqa T001
    eel.say_hello_js('Python {from within say_hello_py()}!')


@eel.expose
def confirm_basic_info(x):
    print(json.dumps(x))
    return {'status': 'success'}
    # return {'status': 'error', 'message': 'test'}


@eel.expose
def expand_user(folder):
    """Return the full path to display in the UI."""
    return '{}/*'.format(os.path.expanduser(folder))


def start_eel(develop):
    """Start Eel with either production or development configuration."""

    if develop:
        directory = 'web/src'
        app = None
        page = {'port': 3000}
    else:
        directory = 'web/dist'
        app = 'chrome'
        page = 'index.html'

    eel.init(directory, ['.tsx', '.ts', '.jsx', '.js', '.html'])

    # These will be queued until the first connection is made, but won't be repeated on a page reload
    say_hello_py('Python World!')
    # Call a JavaScript function (must be after `eel.init()`)
    eel.say_hello_js('Python World!')

    eel_kwargs = dict(
        host='localhost',
        port=8080,
        size=(1280, 800),
    )
    try:
        eel.start(page, mode=app, **eel_kwargs)
    except EnvironmentError:
        # If Chrome isn't found, fallback to Microsoft Edge on Win10 or greater
        if sys.platform in ['win32', 'win64'] and int(platform.release()) >= 10:
            eel.start(page, mode='edge', **eel_kwargs)
        else:
            raise


@eel.expose
# Function for closing python program
def end_session():
    exit()


@eel.expose
def time_table(x, y, content):
    global matrix
    matrix[y][x] = content
    return json.dump(matrix)


if __name__ == '__main__':
    # Pass any second argument to enable debugging
    start_eel(develop=len(sys.argv) == 2)
