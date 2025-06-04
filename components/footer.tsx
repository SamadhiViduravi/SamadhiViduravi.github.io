export default function Footer() {
  return (
    <footer className="footer" data-scroll-section>
      <div className="container">
        <div className="footer-content">
          <p className="copyright">&copy; {new Date().getFullYear()} Samadhi Viduravi. All Rights Reserved.</p>
        </div>
        <div className="footer-bottom">
          <p>
            Designed & Built with <i className="fas fa-heart"></i> by Samadhi Viduravi
          </p>
        </div>
      </div>
    </footer>
  )
}
