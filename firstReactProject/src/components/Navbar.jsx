import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
function NavigationBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="px-3">
        <Navbar.Brand href="#about" className="fw-bold">
          START FRAMEWORK
        </Navbar.Brand>
        <Nav className="ms-auto" defaultActiveKey="#about" variant="pills">
          <Nav.Link href="#about">ABOUT</Nav.Link>
          <Nav.Link href="#portfolio">PORTFOLIO</Nav.Link>
          <Nav.Link href="#contact">CONTACT</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}

export default NavigationBar;
