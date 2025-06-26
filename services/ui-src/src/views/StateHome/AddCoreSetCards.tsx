import { useNavigate, useParams } from "react-router-dom";
import * as CUI from "@chakra-ui/react";
import { useUser } from "hooks/authHooks";
import { CoreSetField } from "shared/coreSetByYear";
import { FaPlusCircle } from "react-icons/fa";

interface AddCoreSetCardProps {
  title: string;
  buttonText: string;
  to: string;
  coreSetExists: boolean;
}

export const AddCoreSetCard = ({
  title,
  buttonText,
  to,
  coreSetExists,
}: AddCoreSetCardProps) => {
  const { isStateUser } = useUser();
  const { state, year } = useParams();
  const navigate = useNavigate();

  return (
    <CUI.Box
      as="aside"
      borderRadius="base"
      borderWidth="thin"
      borderLeftWidth="1rem"
      borderLeftColor="blue.500"
      minW="363px"
      width="363px"
      p="6"
    >
      <CUI.Stack spacing="6">
        <CUI.Text fontWeight="bold">{title}</CUI.Text>
        <CUI.Button
          data-cy={to + "button"}
          rightIcon={<FaPlusCircle />}
          variant={"outline-primary"}
          fontSize={"1.2rem"}
          isDisabled={!isStateUser || coreSetExists}
          onClick={() => {
            //because they button acts like a link, it can never truly be disabled so we have to prevent the navigation instead
            if (!(!isStateUser || coreSetExists))
              navigate(`/${state}/${year}/${to}`);
          }}
          as={CUI.Link}
        >
          {!coreSetExists ? buttonText : "Already Added"}
        </CUI.Button>
      </CUI.Stack>
    </CUI.Box>
  );
};

interface Props {
  coreSetCards: CoreSetField[];
}

const GetSetCard = (coreSet: CoreSetField) => {
  switch (coreSet.type) {
    case "coreSet":
      return (
        <AddCoreSetCard
          key={coreSet.label}
          title={`Need to report on ${coreSet.label} data?`}
          buttonText={`Add ${coreSet.label} Core Set`}
          to={coreSet.path!}
          coreSetExists={coreSet.exist!}
        />
      );
    case "text":
      return (
        <CUI.Center
          w={{ base: "100%", md: "44" }}
          textAlign={{ base: "left", md: "center" }}
          key={coreSet.label}
        >
          <CUI.Text fontStyle="italic" fontSize="sm">
            {coreSet.label}
          </CUI.Text>
        </CUI.Center>
      );
    default:
      return <></>;
  }
};

export const AddCoreSetCards = ({ coreSetCards }: Props) => {
  return (
    <>
      {coreSetCards.map((coreSet: any) => {
        return GetSetCard(coreSet);
      })}
    </>
  );
};
