import { useAuth } from "../hooks/useAuth";

function Dashboard() {
  const {user, authLoading} = useAuth();
  if(authLoading){
    return(
        <>
            <h1 className="text-9xl">LOADING...</h1>
        </>
    )
  }
  return (
    <>
    {
        user ? 
        (<h1>Welcome {user.name}</h1>) : 
        (<h1>Not Logged in</h1>)
    }
    </>
  );
}
export default Dashboard;
