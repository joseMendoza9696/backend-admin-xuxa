// aqui se debe agregar una coleccion a la DB para manejar las sesiones de los sockets

const employees = []

const addEmployee = ({ id, employeeID, room }) => {

    // validate the data
    // verificamos si existen los dos argumentos
    if ( !employeeID || !room ) {
        return {
            error: 'Username and room are required'
        }
    }

    // console.log(employees)

    // check for existing employee
    const existingEmployee = employees.find((employee) => {
        return employee.room === room && employee.employeeID === employeeID;
    });

    // validate employeeID
    if ( existingEmployee ) {
        return {
            error: 'Employee id is in use!'
        }
    }

    // store employee
    const employee = { id, employeeID, room };
    employees.push(employee);
    console.log('employess: ',employees)
    return { employee };

}

const getEmployee = ( id ) => {
    return employees.find( (employee) => employee.id === id );
}

const removeEmployee = (id) => {
    const index = employees.findIndex((employee) => employee.id === id );
    console.log('employess: ',employees)

    if ( index !== -1 ) {
        return employees.splice( index, 1 )[0];
    }
}

module.exports = {
    addEmployee,
    getEmployee,
    removeEmployee
}
