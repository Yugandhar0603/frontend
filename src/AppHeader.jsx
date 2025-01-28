export function AppHeader() {
    return (
      <>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
          <div className="container-fluid">
            <ul className="navbar-nav">
              {Auth.isLoggedIn && Auth.getRole() == "CUSTOMER" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/display">
                    Display
                  </Link>
                </li>
              ) : (
                ""
              )}
              {Auth.isLoggedIn && Auth.getRole() == "CUSTOMER" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/sports-list">
                    Sports
                  </Link>
                </li>
              ) : (
                ""
              )}
              {Auth.isLoggedIn && Auth.getRole() == "CUSTOMER" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/counter">
                    Counter
                  </Link>
                </li>
              ) : (
                ""
              )}
              {Auth.isLoggedIn && Auth.getRole() == "CUSTOMER" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/list-city">
                    List City
                  </Link>
                </li>
              ) : (
                ""
              )}
              {Auth.isLoggedIn && Auth.getRole() == "CUSTOMER" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/toggle-name">
                    Toggle Name
                  </Link>
                </li>
              ) : (
                ""
              )}
              {Auth.isLoggedIn && Auth.getRole() == "CUSTOMER" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/todo">
                    Todo
                  </Link>
                </li>
              ) : (
                ""
              )}
              {Auth.isLoggedIn && Auth.getRole() == "CUSTOMER" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/fruit-list">
                    Fruit
                  </Link>
                </li>
              ) : (
                ""
              )}
              {Auth.isLoggedIn && Auth.getRole() == "CUSTOMER" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/counter-redux">
                    Counter Redux
                  </Link>
                </li>
              ) : (
                ""
              )}
              {Auth.isLoggedIn && Auth.getRole() == "ADMIN" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/book-home">
                    Book
                  </Link>
                </li>
              ) : (
                ""
              )}
              {Auth.isLoggedIn && Auth.getRole() == "ADMIN" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/book-home-http">
                    Book Http
                  </Link>
                </li>
              ) : (
                ""
              )}
              {!Auth.isLoggedIn ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              ) : (
                ""
              )}
              {Auth.isLoggedIn ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    Logout
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </nav>
      </>
    );
  }