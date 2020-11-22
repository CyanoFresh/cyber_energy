import React, { createContext, useContext, useEffect, useState } from 'react';
import { ExternalT } from '../../config';
import { DataContext } from '../dataContext';

export const Tab2Context = createContext();

function range(start, stop, step) {
  if (typeof stop == 'undefined') {
    // one param defined
    stop = start;
    start = 0;
  }

  if (typeof step == 'undefined') {
    step = 1;
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }

  const result = [];

  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
}

const Tab2Provider = ({ children }) => {
  const [inputValues, setInputValues] = useState({
    q: 250,
    S: 300,
    n: 2,
    tInputWater: 15,
    tTargetB: 85,
    tShower: 40,
    QShower: 50,
    countShower: 2,
    tBath: 50,
    QBath: 150,
    countBath: 2,
    calcVariant: '1',
    tankHeatTime: 1,
    tankPower: 2,
    tInsideHouse: 20,
    tariffCentral: 1654,
    tariffGas: 7,
    tariffCoal: 6800,
    tariffWood: 2000,
    tariffPellet: 4000,
    tariffElectrical: 1.5,
  });
  const [result, setResult] = useState({
    tankHeatTime: null,
    tankPower: null,
    points: [],
  });
  const { data } = useContext(DataContext);

  useEffect(() => {
    let tankPower, tankHeatTime;

    const QShower = inputValues.QShower * inputValues.countShower;
    const QShowerT =
      (QShower * (inputValues.tShower - inputValues.tInputWater)) /
      (inputValues.tTargetB - inputValues.tInputWater);

    const QBath = inputValues.QBath * inputValues.countBath;
    const QBathT =
      (QBath * (inputValues.tBath - inputValues.tInputWater)) /
      (inputValues.tTargetB - inputValues.tInputWater);

    const W =
      ((1.163 * (QBathT + QShowerT)) / 998) *
      (inputValues.tTargetB - inputValues.tInputWater);

    if (inputValues.calcVariant === '1') {
      tankPower = (W / inputValues.tankHeatTime).toFixed(2);
    } else {
      tankHeatTime = (W / inputValues.tankPower).toFixed(1);
    }

    const inside = 18;

    const k1 = +(
      ((inputValues.q / 1000) * inputValues.S) /
      (ExternalT - inside)
    ).toFixed(3);
    const b1 = +(-k1 * inside).toFixed(3);
    let Wsum = 0;

    const points = range(ExternalT, inside + 1).map(tmp => {
      const q = +(k1 * tmp + b1).toFixed(3);
      const q2 = +(k1 * tmp + -k1 * inputValues.tInsideHouse).toFixed(3);

      const point = data.temperatureToHours.find(
        point => +point.temperature === tmp
      );
      const t = point?.hours || 0;

      Wsum += q2 * t;
      console.log(tmp, t, q2, Wsum);

      return {
        tmp,
        q,
        q2,
      };
    });

    const f = k1 + 't + ' + b1;

    const histogram = [
      {
        name: 'Газовий котел',
        price: +(Wsum * 0.1075 * inputValues.tariffGas).toFixed(2),
      },
      {
        name: 'Вугільний котел',
        price: +(Wsum * 0.0001792 * inputValues.tariffCoal).toFixed(2),
      },
      {
        name: "Дров'яний котел",
        price: +(Wsum * 0.000287 * inputValues.tariffWood).toFixed(2),
      },
      {
        name: 'Пелетний котел',
        price: +(Wsum * 0.0001953 * inputValues.tariffPellet).toFixed(2),
      },
      {
        name: 'Електричний котел',
        price: +(Wsum * 1.01 * inputValues.tariffElectrical).toFixed(2),
      },
      {
        name: 'Централізована мережа',
        price: +((Wsum * inputValues.tariffCentral) / 1163).toFixed(2),
      },
    ];

    setResult(result => ({
      ...result,
      tankHeatTime,
      tankPower,
      points,
      f,
      Wsum,
      histogram,
    }));
  }, [inputValues, data.temperatureToHours]);

  const handleInputChange = event =>
    setInputValues(inputValues => ({
      ...inputValues,
      [event.target.name]: event.target.value,
    }));

  return (
    <Tab2Context.Provider
      value={{
        inputValues,
        setInputValues,
        handleInputChange,
        result,
        setResult,
      }}
    >
      {children}
    </Tab2Context.Provider>
  );
};

export default Tab2Provider;
