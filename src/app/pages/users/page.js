async function getUsers() {
    const res = await fetch('http://localhost:3000/api/users', {
        cache: 'no-store'
    })

    if(!res.ok){
        throw new Error('Gagal mengambil data user')
    }

    return res.json()
}

export default async function UsersPage() {
    const response = await getUsers()
    const users = await response.data
    return (
    <div style={{ padding: '20px' }}>
      <h1>Daftar Pengguna Toko</h1>
        <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
            <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Alamat</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}