import axios from 'axios'

const api = axios.create(
    {
        baseURL: 'http://localhost:8080/api/v1',
    }
)

export const getData = () => {
    return api.get("/student");
}

export const postData = (data) => {
    return api.post("/student", data);
}

export const deleteData = (id) => {
    return api.delete(`/student/${id}`);
}

export const updateData = (id, student) => {
    return api.put(`/student/${id}?name=${student.name}&email=${student.email}`);
}