employees = [
    {
        "id": 1,
        "name": "Nagaraju",
        "email": "nagaraju@gmail.com",
        "age": 23,
        "dep": "IT"
    },
    {
        "id": 2,
        "name": "suresh",
        "email": "suresh@gmail.com",
        "age": 24,
        "dep": "IT"

    },
    {
        "id": 3,
        "name": "rajesh",
        "email": "rajesh@gmail.com",
        "age": 25,
        "dep": "sales"

    },{
        "id": 4,
        "name": "vikram",
        "email": "vikram@gmail.com",
        "age": 24,
        "dep": "IT"

    }
]

def get_next_id():
    if not employees:
        return 1
    return max(emp["id"] for emp in employees) + 1
