import { useState, useEffect } from "react";
import StudentData from "../api/StudentData.json";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { getData, postData, deleteData, updateData } from "../api/studentApi"
const Student = () => {
    const [students, setStudents] = useState({ id: null, name: "", email: "", course: "", dob: "" });
    const [studentList, setStudentList] = useState(StudentData);
    const [isEdit, setIsEdit] = useState(false);

    // useEffect(() => {
    // console.log("Updated studentList:", studentList);
    // }, [studentList]);

    const getPostData = async () => {
        const res = await getData();
        setStudentList(res.data);
    }
    useEffect(() => {
        getPostData();
    }, [])


    const handleAddOrUpdateStudent = async (event) => {
        event.preventDefault();
        try {
            if (isEdit) {
                const res = await updateData(students.id, students)
                console.log("updated data response",res);
                if(res.status === 200)
                {
                   setStudentList(studentList.map((std) => std.id === students.id ? students : std)) 
                   setIsEdit(false);
                   setStudents({ id: null, name: "", email: "", course: "", dob: "" })
                } 
            }
            else {
                const res = await postData(students)
                console.log("res", res);
                if (res.status === 200) {
                    setStudentList(prevList => [...prevList, res.data]);
                    setStudents({ id: null, name: "", email: "", course: "", dob: "" })
                }
                //const newStudent = {...students, id: Date.now()}
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleDeleteStudent =async (id) => {
        try{
            const res = await deleteData(id)
            if(res.status === 200){
                setStudentList(studentList.filter((student) => student.id !== id));
            }        
        }
        catch(error){
            console.log(error);
        }
    }
    const handleEditStudent = (student) => {
        setStudents(student);
        setIsEdit(true);
    }
    return (
        <>
            <div className="student-card">
                <h2>Add Student</h2>
                <form className="student-form" onSubmit={handleAddOrUpdateStudent}>
                    <label htmlFor="name">Name: </label>
                    <input type="text" value={students.name} onChange={(e) => setStudents({ ...students, name: e.target.value })} />
                    <label htmlFor="email">Email: </label><input type="email" value={students.email} onChange={(e) => setStudents({ ...students, email: e.target.value })} />
                    <label htmlFor="course">Course: </label><input type="text" value={students.course} onChange={(e) => setStudents({ ...students, course: e.target.value })} />
                    <label htmlFor="dob">Date of Birth: </label><input type="text" value={students.dob} onChange={(e) => setStudents({ ...students, dob: e.target.value })} />
                    <button type="submit">{isEdit ? "Update Student" : "Add Student"}</button>
                </form>
            </div>
            <div>
                <ul>
                    {studentList.length > 0 ? (
                        <div className="student-list">
                            {studentList.map((student, index) => (
                                <div className="student-item" key={index}>
                                    <h3>{student.name}</h3>
                                    <p>Email: {student.email}</p>
                                    <p>Course: {student.course}</p>
                                    <p>Date of Birth: {student.dob}</p>
                                    <button onClick={() => handleEditStudent(student)}><MdEdit /></button>
                                    <button onClick={() => handleDeleteStudent(student.id)}><MdDeleteForever /></button>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No students added yet.</p>
                    )}
                </ul>

            </div>

        </>
    )
}
export default Student;