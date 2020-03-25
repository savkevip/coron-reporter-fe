import React, { useState } from "react";
import Header from "../../common/Header";
import Divider from "../../common/Divider";
import history from "../../history";
import styled from "styled-components";
import { errorNotification, successNotification } from "../../utils/toastrs";
import { makeStyles } from "@material-ui/core/styles";
import { publicAPI } from "../../utils/api"
import {
  Button,
  Select,
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem
} from "@material-ui/core";

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18
    }
  }
});

const Container = styled.div``;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Registration() {
  const [value, setValue] = useState({});
  const [symptoms, setSymptoms] = useState({});
  const [chronic, setChronic] = useState({});
  const [checked, setChecked] = useState({});


  const onSubmit = async () => {
    const data = {details: {...value}, symptoms: {...symptoms}, chronic: {...checked}}

      if (!value.email) {
        errorNotification("Email je obavezno polje.");
        return;
      }
      if (!value.password) {
        errorNotification("Lozinka je obavezno polje.");
        return;
      }

      try {
        const response = await publicAPI.post('/auth/register', {data});
        history.push("/");
        console.log(data)
        console.log('response', response)
      } catch(error) {
        errorNotification('Error')
      }
    }

  const handleChangeCheckBox = (event, type) => {
    setChecked({ ...checked, [type]: event.target.checked });
  };

  const goBack = () => history.push("/login");

  return (
    <Container>
      <Header>
        <Button onClick={goBack}>Vrati se</Button>
      </Header>

      <Form>
        <h1>Formular o simptomima</h1>

        <label>Pol</label>
        <Select
          id="gender"
          onChange={e => setValue({ ...value, gender: e.target.value })}
          value={value.gender}
        >
          <MenuItem value="male">Muški</MenuItem>
          <MenuItem value="female">Ženski</MenuItem>
        </Select>

        {value.gender === "female" && (
          <>
            <Divider />
            <label>Da li ste u drugom stanju?</label>
            <Select
              id="pregnancy"
              onChange={e => setValue({ ...value, pregnancy: e.target.value })}
              value={value.pregnancy}
            >
              <MenuItem value={true}>Da</MenuItem>
              <MenuItem value={false}>Ne</MenuItem>
            </Select>

            {value.pregnancy && (
              <>
                <Divider />
                <TextField
                  id="standard-number"
                  label="Mesec trudnoće"
                  type="number"
                  value={value.month}
                  onChange={e => setValue({ ...value, month: e.target.value })}
                />
              </>
            )}
          </>
        )}

        <Divider />

        <TextField
          id="ages"
          value={value.age}
          label="Koliko imate godina?"
          type="number"
          onChange={e => setValue({ ...value, age: e.target.value })}
        />

        <Divider />

        <label> Da li ste boravili u rizičnim područjima?</label>
        <Select
          id="areas"
          onChange={e => setValue({ ...value, areas: e.target.value })}
          value={value.areas}
        >
          <MenuItem value={true}>Da</MenuItem>
          <MenuItem value={false}>Ne</MenuItem>
        </Select>

        <Divider />

        <label> Da li ste imali kontakt sa zaraženim osobama?</label>
        <Select
          id="contact"
          onChange={e => setValue({ ...value, contact: e.target.value })}
          value={value.contact}
        >
          <MenuItem value={true}>Da</MenuItem>
          <MenuItem value={false}>Ne</MenuItem>
        </Select>

        <Divider />

        <label> Da li imate temperaturu?</label>
      <Select
        onChange={e => setSymptoms({ ...symptoms, temperature: e.target.value })}
        value={symptoms.temperature}
        >
        <MenuItem value={true}>Da</MenuItem>
        <MenuItem value={false}>Ne</MenuItem>
      </Select>

      <Divider />

      <label>Da li imate kašalj?</label>
      <Select
        onChange={e => setSymptoms({ ...symptoms, cough: e.target.value })}
        value={symptoms.cough}
      >
        <MenuItem value={true}>Da</MenuItem>
        <MenuItem value={false}>Ne</MenuItem>
      </Select>

      <Divider />

      <label>Da li imate bol u grudima?</label>
      <Select
        onChange={e => setSymptoms({ ...symptoms, chestPain: e.target.value })}
        value={symptoms.chestPain}
      >
        <MenuItem value={true}>Da</MenuItem>
        <MenuItem value={false}>Ne</MenuItem>
      </Select>

      <Divider />

      <label>Da li imate bol u grlu?</label>
      <Select
        onChange={e => setSymptoms({ ...symptoms, soreThroat: e.target.value })}
        value={symptoms.soreThroat}
      >
        <MenuItem value={true}>Da</MenuItem>
        <MenuItem value={false}>Ne</MenuItem>
      </Select>

      <Divider />

      <label>Da li poslednjih dana osećate malaksalost ili se umarate više nego obično?</label>
      <Select
        onChange={e => setSymptoms({ ...symptoms, fever: e.target.value })}
        value={symptoms.fever}
      >
        <MenuItem value={true}>Da</MenuItem>
        <MenuItem value={false}>Ne</MenuItem>
      </Select>

      <Divider />

      <label>Da li otežano dišete?</label>
      <Select
        onChange={e => setSymptoms({ ...symptoms, heavyBreathing: e.target.value })}
        value={symptoms.heavyBreathing}
      >
        <MenuItem value={true}>Da</MenuItem>
        <MenuItem value={false}>Ne</MenuItem>
      </Select>

      <Divider />

      <label>Da li imate glavobolju?</label>
      <Select
        onChange={e => setSymptoms({ ...symptoms, headache: e.target.value })}
        value={symptoms.headache}
      >
        <MenuItem value={true}>Da</MenuItem>
        <MenuItem value={false}>Ne</MenuItem>
      </Select>

      <Divider />

        <label htmlFor="smoker">Da li ste pušač?</label>
        <Select
          id="smoker"
          onChange={e => setValue({ ...value, smoke: e.target.value })}
          value={value.smoke}
        >
          <MenuItem value={true}>Da</MenuItem>
          <MenuItem value={false}>Ne</MenuItem>
        </Select>

        <Divider />

        <label>Da li se lečite od neke hronične bolesti?</label>
        <Select
          id="chronic"
          onChange={e => setChronic({ ...chronic, chronicIllness: e.target.value })}
          value={chronic.chronicIllness}
        >
          <MenuItem value={true}>Da</MenuItem>
          <MenuItem value={false}>Ne</MenuItem>
        </Select>

        <Divider />

        {chronic.chronicIllness ? 
        <>
        <label>Obeležite hronične bolesti od kojih bolujete: </label>
         <FormControlLabel
          control={
            <Checkbox
              onChange={e => handleChangeCheckBox(e, "diabetes")}
              name="diabetes"
              color="primary"
            />
          }
          label="Diabetes"
        />

        <Divider />

        <FormControlLabel
          control={
            <Checkbox
              onChange={e => handleChangeCheckBox(e, "asthma")}
              name="asthma"
              color="primary"
            />
          }
          label="Astma"
        />

        <Divider />

        <FormControlLabel
          control={
            <Checkbox
              onChange={e => handleChangeCheckBox(e, "copd")}
              name="copd"
              color="primary"
            />
          }
          label="COPD"
        />

        <Divider />

        <FormControlLabel
          control={
            <Checkbox
              onChange={e => handleChangeCheckBox(e, "high blood preasure")}
              name="high blood preasure"
              color="primary"
            />
          }
          label="Visok krvni pritisak"
        />

        <Divider />

        <FormControlLabel
          control={
            <Checkbox
              onChange={e => handleChangeCheckBox(e, "tumor")}
              name="tumor"
              color="primary"
            />
          }
          label="Tumorske bolesti"
        />

        <Divider />

        <FormControlLabel
          control={
            <Checkbox
              onChange={e => handleChangeCheckBox(e, "other")}
              name="other"
              color="primary"
            />
          }
          label="Druge bolesti"
        />

        {checked.other && (
          <div>
            <Divider />
            <TextField
              id="other"
              label="Navedite bolesti"
              value={value.disease}
              onChange={e =>
                setChronic({ ...chronic, ["disease"]: e.target.value })
              }
            />
          </div>
        )}
        </>
        :
        null}

        <Divider />

        <label> Da li ste imali neke operacije tokom života?</label>
        <Select
          id="surgery"
          onChange={e => setValue({ ...value, surgery: e.target.value })}
          value={value.surgery}
        >
          <MenuItem value={true}>Da</MenuItem>
          <MenuItem value={false}>Ne</MenuItem>
        </Select>

        <Divider />

        <label>Jeste li posljednjih dana primetili nagli pad ili gubitak ukusa ili mirisa?</label>
        <Select
          id="sense"
          onChange={e => setValue({ ...value, sense: e.target.value })}
          value={value.sense}
        >
          <MenuItem value={true}>Da</MenuItem>
          <MenuItem value={false}>Ne</MenuItem>
        </Select>

        <Divider />

        <label>Da li ste u poslednjih 24h imali dijareju?</label>
        <Select
          id="diarrhea"
          onChange={e => setValue({ ...value, diarrhea: e.target.value })}
          value={value.sense}
        >
          <MenuItem value={true}>Da</MenuItem>
          <MenuItem value={false}>Ne</MenuItem>
        </Select>

        <Divider />

        <label>Da li imate bolesti srca ili povišeni krvni pritisak?</label>
        <Select
          id="heart diseases"
          onChange={e => setValue({ ...value, heartDiseases: e.target.value })}
          value={value.heartDiseases}
        >
          <MenuItem value={true}>Da</MenuItem>
          <MenuItem value={false}>Ne</MenuItem>
        </Select>

        <Divider />

        <label>Da li bolujete od raka?</label>
        <Select
          id="cancer"
          onChange={e => setValue({ ...value, cancer: e.target.value })}
          value={value.cancer}
        >
          <MenuItem value={true}>Da</MenuItem>
          <MenuItem value={false}>Ne</MenuItem>
        </Select>
        
        <Divider />

        <TextField
          id="height"
          label="Koja je Vaša visina? (cm)"
          type="number"
          onChange={e => setValue({ ...value, height: e.target.value })}
          value={value.height}
        />

        <Divider />

        <TextField
          id="weight"
          label="Koja je Vaša kilaža? (kg)"
          type="number"
          onChange={e => setValue({ ...value, weight: e.target.value })}
          value={value.weight}
        />

        <Divider />

        <TextField
          id="zip code"
          label="Vaš poštanski broj?"
          type="number"
          onChange={e => setValue({ ...value, zipCode: e.target.value })}
          value={value.zipCode}
        />

        <Divider />

        <TextField
          id="email"
          label="Vaša mail adresa?"
          type="email"
          onChange={e => setValue({ ...value, email: e.target.value })}
          value={value.email}
        />

        <Divider />

        <TextField
          id="password"
          label="Vaša lozinka?"
          type="password"
          onChange={e => setValue({ ...value, password: e.target.value })}
          value={value.password}
        />

        <Divider />

        <Button
          type="submit"
          onClick={onSubmit}
          variant="contained"
          color="secondary"
          size="large"
        >
          Potvrdi
        </Button>
      </Form>
    </Container>
  );
}
