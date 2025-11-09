import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <section className="page_404">
      <div className="col-sm-10 col-sm-offset-1  text-center">
        <div className="four_zero_four_bg">
          <h1 className="centered-text-container">404</h1>
        </div>
        <div className="robotContainer"></div>
        <h3 className="errrorTitle">
          LOOKS LIKE I MIGHT NOT BE THE DATE YOU ARE LOOKING FOR!
        </h3>
        <p>LETS TRY TO FIX THAT :)</p>
        <Link to="/" className="link_404">
          Go to Home
        </Link>
      </div>
    </section>
  );
};
