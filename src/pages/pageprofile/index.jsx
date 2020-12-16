import CardProfile from "../../components/shared/cardprofile";
import Carteditprofile from "../../components/shared/cardeditprofile";
import CardWorksEdit from "../../components/shared/cardProfileWorksEdit";
import React, { useEffect, useState } from "react";
import {
  Container,
  ContainerCard,
  StyledRadioGroup,
  ContainerProfile,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getMyProfile } from "../../kenzieHub/user/myProfile";

import TechForm from "../../components/forms/techForm";
import WorkForm from "../../components/forms/workForm";
import { FormControlLabel, Radio } from "@material-ui/core";

const PageProfile = () => {
  const history = useHistory();
  if (!localStorage.authToken) {
    history.push("/login");
  }

  const [techs, setTechs] = useState([]);
  const [works, setWorks] = useState([]);
  const [radioValue, setRadioValue] = useState("Tech");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  const { searchedMember } = useSelector((state) => state.members);

  useEffect(() => {
    setTechs(searchedMember.techs);
    setWorks(searchedMember.works);
  }, [searchedMember]);

  const sendDispatch = () => {
    dispatch(getMyProfile());
  };
  return (
    <Container>
      <CardProfile
        imageUrl={searchedMember.avatar_url}
        bio={searchedMember.bio}
        name={searchedMember.name}
      ></CardProfile>
      <StyledRadioGroup
        row
        aria-label="view"
        name="view"
        value={radioValue}
        onChange={(evt) => setRadioValue(evt.target.value)}
      >
        <FormControlLabel
          value="Tech"
          control={<Radio />}
          label="Tecnologias"
        />
        <FormControlLabel value="Work" control={<Radio />} label="Projetos" />
      </StyledRadioGroup>
      {radioValue === "Tech" ? (
        <>
          <TechForm sendDispatch={sendDispatch} />
          <ContainerProfile>
            {techs?.map(({ status, title, id }, index) => {
              return (
                <ContainerCard key={index}>
                  <Carteditprofile
                    status={status}
                    title={title}
                    id={id}
                  ></Carteditprofile>
                </ContainerCard>
              );
            })}
          </ContainerProfile>
        </>
      ) : (
        <>
          <WorkForm sendDispatch={sendDispatch} />
          {works?.map(({ description, title, id, deploy_url }, index) => {
            return (
              <ContainerCard key={index}>
                <CardWorksEdit
                  description={description}
                  title={title}
                  id={id}
                  url={deploy_url}
                ></CardWorksEdit>
              </ContainerCard>
            );
          })}
        </>
      )}
    </Container>
  );
};

export default PageProfile;
