
// eslint-disable-next-line react/prop-types
function AdminDashboard({users=[],products=[]}) {
  const userCount=users?.length
  const productCount=products?.length
  return (
    <div>
      <p>users : {userCount}</p>
      <p>products : {productCount}</p>
    </div>
  )
}

export default AdminDashboard