export default async function Dashboard() {
  
  const response = await fetch("http://localhost:3000/api/v1/users");
  const data = await response.json();
  console.log(data);

  return (
    <div>
      <h1>Dashboard</h1>
      <h4>Current users in your application:</h4>
      {data.allusers.map((user) => {
        return <UserCom key={user._id} det={user} />;
      })}
    </div>
  );
}

function UserCom({ det }) {
  console.log(det);

  return (
    <div>
      <h1>{det.username}</h1>
      <h3>{det.email}</h3>
      <h3>{det.password}</h3>
    </div>
  );
}
