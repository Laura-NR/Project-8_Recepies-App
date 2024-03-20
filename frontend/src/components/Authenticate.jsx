
export default function Authenticate({ onAuthenticatedChanged }) {

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
    <form onSubmit={onLoginFormSubmitHAndler}>
      <fieldset>
        <legend>Authentification</legend>
        <label htmlFor="username">Nom d'utilisateur</label>
        <input type="text" name="username" />
        <label htmlFor="password">Mot de passe</label>
        <input type="password" name="password" />
        <button type="submit">Se connecter</button>
      </fieldset>
    </form>
  )
}
