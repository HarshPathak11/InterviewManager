const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: 'white',
      height: '5rem', // 20 * 0.25rem = 5rem
      position: 'relative',
    },
    wrapper: {
      maxWidth: '1200px', // You can customize this based on your layout
      margin: '0 auto',
      padding: '0 1rem',
    },
    borderTop: {
      borderTop: '1px solid #e5e7eb', // Tailwind border-gray-200
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      '@media (minWidth: 768px)': {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    },
    text: {
      fontSize: '0.875rem', // Tailwind text-sm
      color: '#6b7280', // Tailwind text-muted-foreground (approximation)
      textAlign: 'center',
      marginBottom: '0.5rem',
      '@media (min-width: 768px)': {
        textAlign: 'left',
        marginBottom: '0',
      },
    },
    linkContainer: {
      display: 'flex',
      gap: '2rem', // Tailwind space-x-8
    },
    link: {
      fontSize: '0.875rem', // Tailwind text-sm
      color: '#6b7280', // Tailwind text-muted-foreground
      textDecoration: 'none',
      ':hover': {
        color: '#4b5563', // Tailwind hover:text-gray-600
      },
    },
  }

  return (
    <footer style={styles.footer}>
      <div style={styles.wrapper}>
        <div style={styles.borderTop}></div>
        <div style={styles.container}>
          <div style={styles.text}>
            <p>&copy; {new Date().getFullYear()} All rights reserved</p>
          </div>
          <div>
            <div style={styles.linkContainer}>
              <a href="/" style={styles.link}>
                Terms
              </a>
              <a href="/" style={styles.link}>
                Privacy Policy
              </a>
              <a href="/" style={styles.link}>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
