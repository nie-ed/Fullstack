const Course = ({ courses }) => {
  const Header = (props) => {
    return(
      <div>
        <h2>
          {props.course.name}
        </h2>
        <Content course={props.course}/>
      </div>
    )
  }
  
  const Content = ({course}) => {
    return( 
      <div>
        {course.parts.map((part) => {return (<Part key = {part.id} part={part}/>)})}
        <Total course = {course}/>
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>{props.part.name} {props.part.exercises}</p>
      </div>
    )
  }

  const Total = ({course}) => {

    const total = course.parts.reduce( (sum, exce) => {
      console.log('reduce', sum, exce)
      return sum + exce.exercises
    }, 0)
    
      return(
        <p>
          <b>total of {total} exercises</b>
        </p>
    )
  }
  
  
  return (
    <div>
      {courses.map(course =>
        <Header key={course.id} course={course} />
      )}
    </div>
    ) 
  
  }

  


  
  export default Course