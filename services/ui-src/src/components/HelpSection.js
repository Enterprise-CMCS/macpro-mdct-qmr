import React from "react";
import { helpDeskContact, qualityContact } from "../libs/contacts";

function HelpSection() {
  return (
    <>
      <section className="home-footer-container">
        <div className="home-footer-faq-callout">
          <div>
            <>Do you have questions or need support?</>
            <div className="footer-fed-gov-text">
              For technical questions regarding use of this application, please
              reach out to{" "}
              <a href={`mailto:${helpDeskContact.email}`}>
                {helpDeskContact.email}
              </a>
              . For content-related questions such as about measure
              specifications or what information to enter in each field, please
              reach out to{" "}
              <a href={`mailto:${qualityContact.email}`}>
                {qualityContact.email}
              </a>
            </div>
          </div>
          <div className="ds-l-col--3 ds-u-margin-left--auto"></div>
        </div>
      </section>
    </>
  );
}

export default HelpSection;
