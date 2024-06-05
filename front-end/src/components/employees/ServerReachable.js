const isReachable = () => {
    const timeout = new Promise((resolve, reject) => {
        setTimeout(reject, 300, 'Request timed out');
    });

    const request = fetch('http://localhost:8000/api/employees/');

    return Promise
        .race([timeout, request])
        .then(response => alert('Backend server is on  :)'))
        .catch(error => alert('It timed out :('));
}

isReachable();