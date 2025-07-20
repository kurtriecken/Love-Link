import { useNavigate } from "react-router-dom";

export const NoMatchesMessage = () => {
    const navigate = useNavigate();

    const handleNavigateToProfile = () => {
        navigate('/profile')
    }
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>No matches just yet 💔</h2>
      <p style={styles.text}>
        Sometimes it just takes a little spark to get things moving. Try updating your profile with a few more interests or hobbies — you never know what might catch someone’s eye!
      </p>
      <button onClick={handleNavigateToProfile} style={styles.button}>Update My Profile</button>
    </div>
  );
};


const styles = {
  container: {
    maxWidth: '400px',
    margin: '2rem auto',
    padding: '1.5rem',
    border: '1px solid #cce0f4',
    borderRadius: '12px',
    textAlign: 'center',
    backgroundColor: '#f0f6fc',
    fontFamily: 'sans-serif',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
  },
  header: {
    fontSize: '1.5rem',
    marginBottom: '0.75rem',
    color: '#2a4d6c'
  },
  text: {
    fontSize: '1rem',
    color: '#4a6a8a',
    marginBottom: '1.25rem'
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#89bff7',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  }
};

export default NoMatchesMessage;
