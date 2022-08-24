import * as QMR from "components";
import * as CUI from "@chakra-ui/react";
import * as Libs from "libs";

export function Footer(): JSX.Element {
  return (
    <CUI.Box
      zIndex={3}
      fontSize={{ base: "sm", md: "md" }}
      textAlign={{ base: "center", md: "left" }}
      data-testid="footer"
      className="prince-measure-wrapper-box"
    >
      <CUI.Container
        data-testid="help-section"
        className="help-section"
        maxW="7xl"
      >
        <CUI.Box maxW="4xl">
          <CUI.Text as="h3" fontSize="2xl" mb="3" className="prince-supp-text">
            Do you have questions or need support?
          </CUI.Text>
          <CUI.Box fontSize="sm" mb="4" className="prince-supp-text">
            <QMR.SupportInfo />
          </CUI.Box>
        </CUI.Box>
      </CUI.Container>
      <CUI.Box bg="blue.50" py="2">
        <CUI.Container maxW="7xl" textAlign={{ base: "center", md: "left" }}>
          <CUI.Box
            className="logo-footer prince-flex-overwrite prince-logo-footer"
            display={{ base: "block", md: "flex" }}
            alignItems={{ base: "none", md: "center" }}
          >
            <img
              style={{ maxWidth: "140px" }}
              src="/footer/mdct.png"
              alt="Mdct logo"
              className="logos"
            />
            <img
              style={{ padding: "10px 0 0 50px" }}
              src="/footer/logo-MedicaidGov.svg"
              alt="Medicaid.gov logo"
              className="medicaid-logo"
            />
            <CUI.Spacer />
            <CUI.Flex
              maxW={{ base: "none", md: "md" }}
              className="prince-flex-overwrite prince-flex-row-overwrite"
            >
              <img
                className="logos prince-logo-smaller-sizing"
                src="/footer/depthealthhumanservices_usa.svg"
                alt="Department of Health and Human Services logo"
              />
              <CUI.Text className="prince-footer-smaller-text">
                A federal government website managed and paid for by the U.S.
                Centers for Medicare and Medicaid Services and part of the
                MACPro suite.
              </CUI.Text>
            </CUI.Flex>
          </CUI.Box>
        </CUI.Container>
      </CUI.Box>
      <CUI.Box bg="#0071bc" color="white" py="2">
        <CUI.Container maxW="7xl" textAlign={{ base: "center", md: "left" }}>
          <CUI.Box
            display={{ base: "block", md: "flex" }}
            className="prince-flex-overwrite"
          >
            <CUI.Text>
              Email{" "}
              <CUI.Link
                _hover={{ color: "white" }}
                href={`mailto:${Libs.helpDeskContact.email}`}
              >
                {" "}
                {Libs.helpDeskContact.email}
              </CUI.Link>{" "}
              for help or feedback.
            </CUI.Text>
            <CUI.Spacer />
            <CUI.Text>7500 Security Boulevard Baltimore, MD 21244</CUI.Text>
          </CUI.Box>
        </CUI.Container>
      </CUI.Box>
    </CUI.Box>
  );
}
