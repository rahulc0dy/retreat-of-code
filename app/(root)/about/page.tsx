import React from "react";
import Link from "next/link";

const AboutPage: React.FunctionComponent = () => {
  return (
    <main className="max-w-7xl px-2 font-light">
      <section>
        <h1 className="glow">About Retreat of Code</h1>
        <p className="text-overlay-1 font-light">
          Hi! I'm{" "}
          <Link
            href="https://github.com/rahulc0dy"
            className="text-lavender/60 hover:text-lavender"
          >
            Rahul Chakraborty
          </Link>
          . I created Retreat of Code. I hope you enjoy it! I also work on many
          other projects, and you can follow me on Twitter, Mastodon, and
          GitHub.
        </p>
      </section>

      <section>
        <h2 className="text-text my-3 text-lg">
          --- What is Retreat of Code? ---
        </h2>
        <p className="text-overlay-1 font-light">
          Retreat of Code is a unique collection of programming challenges and
          code retreats designed to improve your coding skills and creative
          problem-solving abilities. Whether you're an aspiring developer or a
          seasoned programmer, you'll find challenges that can be solved in any
          programming language you choose. Many use these challenges for
          interview prep, professional training, coursework, or just for fun.
        </p>
        <p className="text-overlay-1 font-light">
          You don't need an advanced computer science background—just a bit of
          coding know-how and a willingness to learn. Even older hardware can
          handle the puzzles quickly.
        </p>
      </section>

      <section>
        <h2 className="text-text my-3 text-lg">--- General Tips ---</h2>
        <p className="text-overlay-1 font-light">
          If you get stuck on a challenge, start by testing your solution
          against the provided examples. If your results don't match, re-read
          the problem description—perhaps there’s a detail you misunderstood.
          Once the examples work, create additional test cases to ensure your
          solution is robust. And if you’re still having trouble, take a break
          or discuss the challenge with a friend or community member.
        </p>
      </section>

      <section>
        <h2 className="text-text my-3 text-lg">
          --- Frequently Asked Questions ---
        </h2>

        <h3 className="text-subtext-0 mt-2">How do I get started?</h3>
        <p className="text-overlay-1 font-light">
          Simply pick a challenge that interests you and start coding. The
          challenges are designed to scale in difficulty so there’s something
          for everyone.
        </p>

        <h3 className="text-subtext-0 mt-2">How does authentication work?</h3>
        <p className="text-overlay-1 font-light">
          Retreat of Code uses OAuth to verify your identity via trusted
          third-party services. This means you only provide your credentials to
          those services, and we only receive the public profile information
          needed to identify you.
        </p>

        <h3 className="text-subtext-0 mt-2">Is there a global leaderboard?</h3>
        <p className="text-overlay-1 font-light">
          If you’re into friendly competition, you can opt into a global
          leaderboard to see how your progress compares with others. However,
          participation is entirely optional—focus on your own learning journey
          if that’s what you prefer.
        </p>

        <h3 className="text-subtext-0 mt-2">Can I share my solutions?</h3>
        <p className="text-overlay-1 font-light">
          Feel free to share your coding process and experiences, but please
          refrain from copying or redistributing the challenge descriptions or
          other proprietary content from Retreat of Code.
        </p>
      </section>

      <section>
        <h2 className="text-text my-3 text-lg">--- Credits ---</h2>
        <p className="text-overlay-1 font-light">
          Challenges, Code, & Design:{" "}
          <span className="glow glow text-purple-100">rahulc0dy</span>
        </p>
        <p className="text-overlay-1 font-light">
          Special thanks to all the community contributors who help make Retreat
          of Code a vibrant space for learning and collaboration.
        </p>
      </section>

      <section>
        <h2 className="text-text my-3 text-lg">--- Legal ---</h2>
        <p className="text-overlay-1 font-light">
          Retreat of Code is a trademark of Rahul Chakraborty. The design, text,
          and structure of this site are the sole property of Rahul Chakraborty
          and may not be replicated or used without explicit permission. All
          rights reserved.
        </p>
      </section>
    </main>
  );
};

export default AboutPage;
