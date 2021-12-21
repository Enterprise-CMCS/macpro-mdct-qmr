import * as CUI from "@chakra-ui/react";
import * as Libs from "libs";

export function Footer(): JSX.Element {
  return (
    <CUI.Box
      fontSize={{ base: "sm", md: "md" }}
      textAlign={{ base: "center", md: "left" }}
      data-testid="footer"
    >
      <CUI.Container data-testid="help-section" maxW="7xl">
        <CUI.Box maxW="4xl" py="6">
          <CUI.Text as="h3" fontSize="2xl" mb="3">
            Do you have questions or need support?
          </CUI.Text>
          <CUI.Text fontSize="sm">
            For technical questions regarding use of this application, please
            reach out to{" "}
            <CUI.Link
              color="blue"
              href={`mailto:${Libs.helpDeskContact.email}`}
            >
              {Libs.helpDeskContact.email}
            </CUI.Link>
            . For content-related questions, such as about measure
            specifications or what information to enter in each field, please
            reach out to{" "}
            <CUI.Link color="blue" href={`mailto:${Libs.qualityContact.email}`}>
              {Libs.qualityContact.email}
            </CUI.Link>
          </CUI.Text>
        </CUI.Box>
      </CUI.Container>
      <CUI.Box bg="blue.50">
        <CUI.Container maxW="7xl" textAlign={{ base: "center", md: "left" }}>
          <CUI.Box
            py="4"
            display={{ base: "block", md: "flex" }}
            alignItems={{ base: "none", md: "center" }}
          >
            <img
              style={{ display: "inline" }}
              src="/footer/logo-MedicaidGov.svg"
              alt="Medicaid.gov logo"
            />
            <CUI.Spacer />
            <CUI.Flex maxW={{ base: "none", md: "md" }}>
              <img
                src="/footer/depthealthhumanservices_usa.svg"
                alt="Department of Health and Human Services logo"
              />
              <CUI.Box pl="3">
                A federal government website managed and paid for by the U.S.
                Centers for Medicare and Medicaid Services and part of the
                MACPro suite.
              </CUI.Box>
            </CUI.Flex>
          </CUI.Box>
        </CUI.Container>
      </CUI.Box>
      <CUI.Box bg="#0071bc" color="white" py="4">
        <CUI.Container maxW="7xl" textAlign={{ base: "center", md: "left" }}>
          <CUI.Box display={{ base: "block", md: "flex" }}>
            <CUI.Text>
              Email{" "}
              <CUI.Link href={`mailto:${Libs.helpDeskContact.email}`}>
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
