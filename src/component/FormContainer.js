import React, { useState } from "react";
import "./FormContainer.css";

const FormContainer = () => {
  let [sigmaVV, setSigmaVV] = useState();
  let [sigmaVH, setSigmaVH] = useState();
  let [theta, setTheta] = useState();
  let [analysedData, setAnalysedData] = useState(false);
  let result;
  let [isLoader, setIsLoader] = useState(false);
  // let sigmaVhLinear,sigmaVvLinear,incidenceAngle,waveNumber,optimizedDielectric,optimizedSoilRoughness,modelSigmaVh;
  // let modelSigmaVv,meanHeight,rmsHeight,estimateSoilMoisture,estimateSoilRoughness;
  let index = 0;

  const staticContent = 
    [
      "Optimized Dielectric Constant: ", 
      "Wave Number: ",
      "Mean Height: ", 
      "Model Sigma Vh: ", 
      "Model Sigma Vv: ", 
      "Rms Height: ", 
      "Sigma Vh Linear: ", 
      "Sigma Vv Linear: ", 
      "Estimated Soil Moisture: ", 
      "Estimated Soil Roughness: ", 
      "Optimized Surface Roughness: ", 
      "Incidence Angle: "
    
    
  ];

  const callApi = async () => {
    setIsLoader(true);
    setAnalysedData(false);
    result = await fetch(
      `https://codercommunity.pythonanywhere.com/?sigma_vv=${sigmaVV}&sigma_vh=${sigmaVH}&theta=${theta}`
    );
    result = await result.json();
    // sigmaVhLinear=result.data.sigma_vh_linear
    // console.log(sigmaVhLinear)
    // sigmaVvLinear=result.data.sigmaVvLinear
    // incidenceAngle=result.data.incidence_angle
    // waveNumber=result.data.wave_number;
    // optimizedDielectric=result.data.optimized_dielectric_constant
    // optimizedSoilRoughness=result.data.optimized_surface_roughness
    // modelSigmaVh=result.data.model_sigma_vh
    // modelSigmaVv=result.data.model_sigma_vv
    // meanHeight=result.data.mean_height
    // rmsHeight=result.data.rms_height
    // estimateSoilMoisture=result.data.estimated_soil_moisture
    // estimateSoilRoughness=result.data.estimated_soil_roughness
    setIsLoader(false); 
    setAnalysedData(result.data);
  };

  return (
    <div>
      <h1>Sentinel-1A Backscatter Analysis</h1>

      <div className="input-form">
        <label for="sigma_vv">sigma_vv (dB):</label>
        <input
          value={sigmaVV}
          onChange={(e) => {
            setSigmaVV(e.target.value);
          }}
          type="text"
          className="sigma_vv"
          placeholder="Enter sigma_vv in dB"
        ></input>
        {/* <br> */}
        <label for="sigma_vh">sigma_vh (dB):</label>
        <input
          value={sigmaVH}
          onChange={(e) => {
            setSigmaVH(e.target.value);
          }}
          type="text"
          className="sigma_vh"
          placeholder="Enter sigma_vh in dB"
        ></input>
        {/* <br> */}
        <label for="theta">Incidence Angle (degrees):</label>
        <input
          value={theta}
          onChange={(e) => {
            setTheta(e.target.value);
          }}
          type="text"
          className="theta"
          placeholder="Enter incidence angle in degrees"
        ></input>
        {/* <br> */}
        <button onClick={callApi}>calculate</button>
        {analysedData ? (
          <div className="result_box">
            {/* <p>  sigma_vv (linear scale): {alert(sigmaVvLinear)}          </p>
       <p> sigma_vh (linear scale):<b> {sigmaVhLinear}</b></p>
       <p> Incidence angle (theta) in radians:<b> {incidenceAngle}</b></p>
       <p> Wave number (k): <b>{waveNumber}</b></p>
       <p> Optimized dielectric constant (epsilon): <b>{optimizedDielectric}</b></p>
       <p> Optimized surface roughness (s): <b>{optimizedSoilRoughness} meters</b></p>
       <p> Modeled sigma_vv: <b>{modelSigmaVv}</b></p>
       <p> Modeled sigma_vh: <b>{modelSigmaVh}</b></p>
       <p> Mean height: <b>{meanHeight} cm</b></p>
       <p> RMS height (surface roughness):<b> {rmsHeight} cm</b></p>
       <p> Estimated Soil Moisture:<b> {estimateSoilMoisture} or {estimateSoilMoisture * 100}%</b></p>
       <p> Estimated Soil Roughness:<b> {estimateSoilRoughness} meters</b></p> */}
            {/* {JSON.stringify(analysedData)} */}

            {Object.entries(analysedData).map(([key, value], index) => (
              <p key={key}>
                {staticContent[index]}
                <b className="data-value">{value}</b>
                {/* {index=index+1} */}
              </p>
            ))}
          </div>
        ) : (
          <div className="result_box">
            {isLoader ? (
              <div>
                <h3 className="loader"> Analysing...</h3>
              </div>
            ) : (
                
              analysedData== false ? <span> click on Calculate to get Result !</span>
              : <span> Invalid Input !</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormContainer;
