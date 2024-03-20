
export default function Authenticate({ onAuthenticatedChanged, switchToRegister }) {

  async function onLoginFormSubmitHAndler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const payload = {
      name: formData.get('username'),
      password: formData.get('password')
    };
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.status !== 200) {
      window.alert('Authentification failed');
      return;
    }

    const data = await response.json();
    const jwt = data.token;
    localStorage.setItem('jwt', jwt); // Store the token
    onAuthenticatedChanged(true, jwt);
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minWidth: '100vw' }}>
      <form onSubmit={onLoginFormSubmitHAndler} className="needs-validation" noValidate style={{ maxWidth: "400px", width: "100%" }}>
        <fieldset>
          <legend>Authentication</legend>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" name="username" id="username" className="form-control" required />
            <div className="invalid-feedback">
              Please choose a username.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" id="password" className="form-control" required />
            <div className="invalid-feedback">
              Please enter your password.
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </fieldset>
        <div className="text-center mt-3">
          <button onClick={switchToRegister} className="btn btn-success">Register</button>
        </div>
      </form>
    </div>
  )
}
