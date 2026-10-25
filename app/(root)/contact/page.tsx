import React from "react";
import Link from "next/link";

const ContactPage: React.FunctionComponent = () => {
  return (
    <main className="max-w-7xl px-2 font-light">
      <section>
        <h1 className="glow">Contact Retreat of Code</h1>
        <p className="text-overlay-1 font-light">
          Retreat of Code is maintained by{" "}
          <Link
            href="https://github.com/rahulc0dy"
            className="text-lavender/60 hover:text-lavender"
          >
            Rahul Chakraborty
          </Link>
          . If you have questions, feedback, or want to report an issue, you can reach out through the channels below.
        </p>
      </section>

      <section>
        <h2 className="text-text my-3 text-lg">--- Bug Reports & Inquiries ---</h2>
        <p className="text-overlay-1 font-light">
          If you encounter a problem with a puzzle description, an issue with input generation, or a bug in the application, please open an issue on the{" "}
          <Link
            href="https://github.com/rahulc0dy/retreat-of-code/issues"
            className="text-lavender/60 hover:text-lavender"
          >
            GitHub Issues
          </Link>{" "}
          page.
        </p>
      </section>

      <section>
        <h2 className="text-text my-3 text-lg">--- Community ---</h2>
        <p className="text-overlay-1 font-light">
          You can share solutions, discuss problem approaches, or participate in code retreats with the community on GitHub and social media. Please avoid posting direct puzzle inputs and solutions in public issue titles.
        </p>
      </section>
    </main>
  );
};

export default ContactPage;
