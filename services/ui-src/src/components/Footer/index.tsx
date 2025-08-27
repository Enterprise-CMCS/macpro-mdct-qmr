import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Libs from "libs";

const VerticalLogoFooter = () => {
  return (
    <CUI.VStack
      minW="100%"
      textAlign="center"
      display="flex"
      alignItems="center"
      flexFlow="column"
      spacing="1rem"
    >
      <img
        style={{ maxHeight: "4.875rem" }}
        src="/footer/mdct-qmr-footer.svg"
        alt="Mdct logo"
        className="logos"
      />
      <CUI.HStack>
        <img
          className="logos prince-logo-smaller-sizing"
          src="/footer/depthealthhumanservices_usa.svg"
          alt="Department of Health and Human Services logo"
          style={{ maxWidth: "4.375rem" }}
        />
        <img
          style={{ maxWidth: "15rem", paddingLeft: "1rem" }}
          src="/footer/logo-MedicaidGov.svg"
          alt="Medicaid.gov logo"
          className="medicaid-logo"
        />
      </CUI.HStack>
      <CUI.Text fontSize="sm" textAlign="left">
        A federal government website managed and paid for by the U.S. Centers
        for Medicare and Medicaid Services and part of the MACPro suite.
      </CUI.Text>
    </CUI.VStack>
  );
};

const HorizontalLogoFooter = () => {
  return (
    <CUI.Container
      minW="100%"
      textAlign="left"
      display="flex"
      alignItems="top"
      padding="0"
    >
      <img
        style={{ maxHeight: "4.875rem" }}
        src="/footer/mdct-qmr-footer.svg"
        alt="Mdct logo"
        className="logos"
      />
      <CUI.Spacer />
      <CUI.Stack
        maxW={{ base: "none", md: "md" }}
        className="prince-flex-overwrite prince-flex-row-overwrite"
      >
        <CUI.HStack>
          <img
            className="logos prince-logo-smaller-sizing"
            src="/footer/depthealthhumanservices_usa.svg"
            alt="Department of Health and Human Services logo"
            style={{ maxWidth: "4.375rem", padding: "0 0.1rem" }}
          />
          <CUI.Text fontSize="sm">
            A federal government website managed and paid for by the U.S.
            Centers for Medicare and Medicaid Services and part of the MACPro
            suite.
          </CUI.Text>
        </CUI.HStack>
        <img
          style={{ maxWidth: "15rem", paddingLeft: "4.825rem" }}
          src="/footer/logo-MedicaidGov.svg"
          alt="Medicaid.gov logo"
          className="medicaid-logo"
        />
      </CUI.Stack>
    </CUI.Container>
  );
};

export const emailLink = () => {
  return (
    <CUI.Link
      _hover={{ color: "white" }}
      href={`mailto:${Libs.helpDeskContact.email}`}
    >
      {Libs.helpDeskContact.email}
    </CUI.Link>
  );
};

export function Footer(): JSX.Element {
  return (
    <CUI.Box
      as="footer"
      zIndex={2}
      fontSize={{ base: "sm", md: "md" }}
      textAlign={{ md: "left" }}
      data-testid="footer"
      className="prince-measure-wrapper-box"
    >
      <section>
        <CUI.Container
          data-testid="help-section"
          className="help-section"
          maxW="7xl"
        >
          <CUI.Box maxW="4xl">
            <CUI.Heading
              as="h3"
              fontSize="2xl"
              mb="3"
              className="prince-supp-text"
            >
              Do you have questions or need support?
            </CUI.Heading>
            <CUI.Box fontSize="sm" mb="4" className="prince-supp-text">
              <QMR.SupportInfo />
            </CUI.Box>
          </CUI.Box>
        </CUI.Container>
      </section>
      <section aria-label="Partner organizations">
        <CUI.Box bg="gray.50" py="2" minHeight="7rem" padding="2rem">
          <CUI.Hide below="md">{HorizontalLogoFooter()}</CUI.Hide>
          <CUI.Show below="md">{VerticalLogoFooter()}</CUI.Show>
        </CUI.Box>
      </section>
      <section aria-label="Contact information">
        <CUI.Box bg="blue.800" color="white" py="2">
          <CUI.Container textAlign={{ md: "left" }} minWidth="100%">
            <CUI.Box
              display={{ base: "block", md: "flex" }}
              className="prince-flex-overwrite"
              fontSize="sm"
              padding="0.5rem 0"
            >
              <CUI.Text>Email {emailLink()} for help or feedback.</CUI.Text>
              <CUI.Spacer />
              <address style={{ fontStyle: "normal", fontWeight: "bold" }}>
                7500 Security Boulevard Baltimore, MD 21244
              </address>
            </CUI.Box>
          </CUI.Container>
        </CUI.Box>
      </section>
    </CUI.Box>
  );
}
