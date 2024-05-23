import { useState } from "react";
import * as CUI from "@chakra-ui/react";
import { stateAbbreviations } from "utils/constants";
import { useNavigate } from "react-router";
import config from "config";
import { useUser } from "hooks/authHooks";
import { BannerCard } from "components/Banner/BannerCard";
import { UserRoles } from "types";
import { useFlags } from "launchdarkly-react-client-sdk";

export const AdminHome = () => {
  const [locality, setLocality] = useState("AL");
  const releaseYearByFlag = useFlags()?.["release2024"]
    ? config.currentReportingYear
    : parseInt(config.currentReportingYear) - 1;
  const navigate = useNavigate();
  const { userRole } = useUser();

  return (
    <CUI.Container maxW="7xl" py="4">
      <CUI.Box py="4">
        <BannerCard />
      </CUI.Box>
      <CUI.Stack spacing="4" maxW="lg">
        <CUI.Heading size="md">Admin Home</CUI.Heading>
        <CUI.Select
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
          aria-label="State to view"
        >
          {stateAbbreviations.map((v: string) => {
            return (
              <option value={v} key={v}>
                {v}
              </option>
            );
          })}
        </CUI.Select>
        <CUI.Button
          colorScheme="blue"
          onClick={() => navigate(`/${locality}/${releaseYearByFlag}`)}
          isFullWidth
          data-cy="Go To State Home"
        >
          Go To State Home
        </CUI.Button>
      </CUI.Stack>
      {/* hide admin banner button if not super admin */}
      {userRole === UserRoles.ADMIN && (
        <CUI.Stack spacing="4" maxW="xl" py="4">
          <CUI.Divider />
          <CUI.Heading size="sm">Banner Admin</CUI.Heading>
          <CUI.Text fontSize="sm">
            Click here to manage the announcement banner.
          </CUI.Text>
          <CUI.Button
            colorScheme="blue"
            onClick={() => navigate(`/admin/banner`)}
            isFullWidth
            data-cy="Banner Editor"
            maxW="xs"
          >
            Banner Editor
          </CUI.Button>
        </CUI.Stack>
      )}
    </CUI.Container>
  );
};
