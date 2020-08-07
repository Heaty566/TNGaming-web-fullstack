import React from "react";

const AboutUs = () => {
  document.title = "About Us | TNGaming";

  return (
    <div className="aboutus">
      <div className="aboutus__container">
        <h2>Learning by listening makes your product’s more productive</h2>
        <h3>Member</h3>
        <div className="members">
          <div className="members__card">
            <img src="/pages/images/members/simon.jpg" alt="simon" />
            <h4>Simon Pham</h4>
          </div>
        </div>
        <h3>Story</h3>
        <p>
          Every time we completed any small projects, we felt it wasn’t enough
          for us, we want to try some thing new and more challenging, so we
          decided to build this project because of 3 reasons. Fist of all, It
          will be a great place where we can practice more about what I am
          learning, applying new techniques or building with different
          structures. Secondly, I love sharing with you guys about code,
          listening your feedback about what new feature we should add, what the
          bad feature we have to improve. Finally, we will use this project in
          our resumes, so I hope if you liked this project, please give us a
          start in Github that will give us a huge motivation to build this more
          helpful for you guys.
        </p>
        <h3>Extra Story</h3>
        <p>
          It’s me, Simon, if you enjoy with this project, I will tell about the
          biggest motivation that helps me to build it everyday, That’s Thinh
          (my wife), we have been apart halfway around the world for years
          because of some personal reasons, and I really hope I would meet her
          one day soon and we would be forever. However, I have to finish my
          college in VN, and then apply for my master's degree in the US to come
          back with her. I don’t know what adversities wait for us forward, I
          will try my best even until my last breath.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
