document.addEventListener("DOMContentLoaded", function() {

  //Rename and remove paths
  const coursesURL = `https://sheltered-stream-73510.herokuapp.com/users/1/courses`
  const studentsURL = `https://sheltered-stream-73510.herokuapp.com/users/1/courses/`
  const updateURL = `https://sheltered-stream-73510.herokuapp.com/users/1/students/`


  const coursesContainer = document.getElementById('course-container')
  const courseDetail = document.getElementById('course-detail')
  const studentForm = document.getElementById('student-form')

  function getCourses(){
    return fetch(coursesURL).then(res => res.json())
  }

  function getStudents(id){
    return fetch(studentsURL + `${id}`).then(res => res.json())
  }
  // getStudents(22).then(res => console.log(res))

  function updatePercentage(id) {
    fetch(updateURL + `${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        percentage: 123
      })
    }).then(res => res.json())
    .then(res => console.log(res))
  }

  // updatePercentage(12)

  courseDetail.addEventListener('click', e => {
    let detailID = e.target.dataset.id
    if (detailID) {
      getStudents(detailID).then(json => {
        // let student = json.students.find(student => {
        //   return student.id == detailID
        // })
        console.log(json);
      })
    }
  })

  coursesContainer.addEventListener('click', e => {
    courseDetail.innerHTML = ''
    let dataId = e.target.dataset.id
    if(dataId){
      getStudents(dataId).then(res => {
        res.students.forEach(student => {
          courseDetail.innerHTML += `<li data-id="${student.id}">${student.name}<span>${student.percentage}</span></li>`
        })
      })
    }
  })

  getCourses().then(res => {
    res.forEach(course => {
      coursesContainer.innerHTML += `<div>
        <h3>${course.name}</h3>
        <p>${course.instructor}</p>
        <p>${course.semester}</p>
        <button data-id="${course.id}" type="button" name="button">See Detail</button>
      </div>`
    })
  })


});
