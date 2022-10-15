import json
import sys
import eel


# Use the latest version of Eel from parent directory
sys.path.insert(1, '../../')


@eel.expose
def request_handler(name, data):
    print('request_handler', name)
    print('data:')
    print(json.dumps(data))

    result = functions[name](data)
    print(result)
    # TODO: add response data
    if result['status']:
        return {'status': 'success', 'data': result['data']}
    else:
        message = 'Wystąpił błąd'
        if 'message' in result:
            message = result['message']
        return {'status': 'error', 'message': message}


@eel.expose  # Expose function to JavaScript
def say_hello_py(x):
    # Print message from JavaScript on app initialization, then call a JS function
    print('Hello from %s' % x)  # noqa T001
    eel.say_hello_js('Python {from within say_hello_py()}!')


def confirm_basic_info(data):
    print(json.dumps(data))
    # return {'status': False}
    return {'status': True, 'data': 'placeholder'}


def get_timetable_data(data):
    return {
        'status': True,
        'data': {
            'hours': 10,
            'teachers': [
                {
                    'id': 1,
                    'name': 'Jan Kowalski',
                    'availability': '11111111110000000000111111111100000000001111111111'
                },
                {
                    'id': 2,
                    'name': 'Adam Małysz',
                    'availability': '11111111111111111111111111111111111111111111111111'
                },
                {
                    'id': 3,
                    'name': 'Piotr Nowak',
                    'availability': '00000000000000000000000000000000000000000000000000'
                },
            ]
        }
    }


def update_availability(data):
    print(json.dumps(data))
    return {'status': True, 'data': {}}


def get_result(data):
    with open('mock.json', encoding='utf-8') as user_file:
        file_contents = user_file.read()
        json_data = json.loads(file_contents)
        json_string = json.dumps(json_data, separators=(',', ":"))
        # print(file_contents)
    return {'status': True, 'data': json_string}


def get_teachers_list(data):
    return {
        'status': True,
        'data': {
            'teachers': [
                {
                    'id': 1,
                    'name': 'Jan Kowalski',
                    'subjects': [
                        {
                            'name': 'Matematyka',
                            'preferredClassrooms': ['103', '104', '105', '106'],
                        },
                        {
                            'name': 'Informatyka',
                            'preferredClassrooms': ['207'],
                        },
                        {
                            'name': 'Informatyka',
                            'preferredClassrooms': ['207'],
                        },
                        {
                            'name': 'Informatyka',
                            'preferredClassrooms': ['207'],
                        },
                        {
                            'name': 'Informatyka',
                            'preferredClassrooms': ['207'],
                        },
                        {
                            'name': 'Informatyka',
                            'preferredClassrooms': ['207'],
                        },
                        {
                            'name': 'Informatyka',
                            'preferredClassrooms': ['207'],
                        },
                    ],
                },
                {
                    'id': 2,
                    'name': 'Adam Małysz',
                    'subjects': [],
                },
                {
                    'id': 3,
                    'name': 'Piotr Nowak',
                    'subjects': [
                        {
                            'name': 'Matematyka',
                        },
                    ],
                },
            ]
        }
    }


def get_classrooms(data):
    return {
        'status': True,
        'data': {
            'classrooms': ['100', '101', '102', '103', '208', '209', '210', '211']
        }
    }


functions = {
    'confirm_basic_info': confirm_basic_info,
    'get_timetable_data': get_timetable_data,
    'get_result': get_result,
    'update_availability': update_availability,
    'get_teachers_list': get_teachers_list,
    'get_classrooms': get_classrooms,
}


def start_eel(develop):
    # Start Eel with either production or development configuration

    if develop:
        directory = 'web/src'
        app = None
        page = {'port': 3000}
    else:
        directory = 'web/dist'
        app = 'chrome'
        page = 'index.html'

    eel.init(directory, ['.tsx', '.ts', '.jsx', '.js', '.html'])

    say_hello_py('Python World!')
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
