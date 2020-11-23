import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { DataContext } from '../dataContext';
import MenuItem from '@material-ui/core/MenuItem';
import Tab2Provider, { Tab2Context } from './Tab2Context';
import { InputField } from './InputField';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { ResultField } from './ResultField';
import {
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

const InputFields = () => {
  const { inputValues } = useContext(Tab2Context);

  return (
    <>
      <InputField
        title="Питомі тепловтрати будівлі"
        name="q"
        unit="Вт/м²"
        TextFieldProps={{
          type: 'number',
          inputProps: {
            min: 0,
            max: 500,
          },
        }}
      />
      <InputField title="Опалювальна площа будинку" name="S" unit="м²" />
      <InputField title="Кількість людей" name="n" />
      <InputField
        title="Температура вхідної води"
        name="tInputWater"
        unit="°C"
      />
      <InputField title="Кінцева температура бака" name="tTargetB" unit="°C" />

      <InputField
        title="Температура води при прийомі душу"
        name="tShower"
        unit="°C"
      />
      <InputField title="Кількість прийомів душу" name="countShower" />
      <InputField title="Обсяг води прийому душу" name="QShower" unit="л" />

      <InputField
        title="Температура води при прийомі ванни"
        name="tBath"
        unit="°C"
      />
      <InputField title="Кількість прийомів ванни" name="countBath" />
      <InputField title="Обсяг води прийому ванни" name="QBath" unit="л" />

      <InputField
        title="Варіант розрахунку"
        name="calcVariant"
        TextFieldProps={{
          select: true,
          children: [
            <MenuItem value="1" key="1">
              розраховуємо потужність нагрівача
            </MenuItem>,
            <MenuItem value="2" key="2">
              розраховуємо тривалість нагріву ємності
            </MenuItem>,
          ],
        }}
      />

      {inputValues.calcVariant === '1' && (
        <InputField
          title="Час нагрівання бака ГВП"
          name="tankHeatTime"
          unit="год"
        />
      )}
      {inputValues.calcVariant === '2' && (
        <InputField
          title="Теплова потужність нагрівача"
          name="tankPower"
          unit="кВт"
        />
      )}

      <InputField
        title="Температуру повітря всередині будівлі"
        name="tInsideHouse"
        unit="°C"
      />

      <Box my={3}>
        <Divider />
      </Box>

      <Typography variant="h5">Тарифи</Typography>

      <InputField
        title="Централізована мережа"
        name="tariffCentral"
        unit="грн/Гкал"
      />

      <InputField title="Газовий котел" name="tariffGas" unit="грн/м³" />

      <InputField title="Вугільний котел" name="tariffCoal" unit="грн/т" />

      <InputField title="Дров'яний котел" name="tariffWood" unit="грн/т" />

      <InputField title="Пелетний котел" name="tariffPellet" unit="грн/т" />

      <InputField
        title="Електричний котел"
        name="tariffElectrical"
        unit="грн/кВт*год"
      />
    </>
  );
};

const ResultFields = () => {
  const { result } = useContext(Tab2Context);

  return (
    <>
      <ResultField title="Час нагрівання бака" name="tankHeatTime" unit="год" />
      <ResultField title="Потужність нагрівача" name="tankPower" unit="кВт" />
      <ResultField
        title="Залежність тепловтрат будівлі від температурних умов"
        name="f"
      />
      <ResultField
        title="Витрати енергії на опалення за визначений період"
        name="Wsum"
        unit="кВт*год"
      />

      <Box my={3} />

      <Typography variant="h5" gutterBottom>
        Залежність тепловтрат будівлі від температурних умов
      </Typography>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={result.points}>
          <XAxis
            dataKey="tmp"
            type="number"
            label={{
              value: 'Температура, °C',
              offset: 0,
              position: 'insideBottom',
            }}
          />
          <YAxis
            label={{
              value: 'Q, кВт',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            dataKey="q"
            name="Тепловтрати за замовчуванням"
            stroke="#2962ff"
          />
          <Line dataKey="q2" name="Тепловтрати" stroke="red" />
        </LineChart>
      </ResponsiveContainer>

      <Box my={3} />

      <Typography variant="h5" gutterBottom>
        Гістограма витрат на опалення для різних систем теплозабезпечення
      </Typography>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={result.histogram}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: 'Вартість, грн',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" unit=" грн." name="Вартість" fill="#ec407a" />
        </BarChart>
      </ResponsiveContainer>

      <Typography variant="h6" gutterBottom>
        Найвигідніше: {result.profitable.name} ({result.profitable.price} грн)
      </Typography>
    </>
  );
};

export function Tab2() {
  const { data } = useContext(DataContext);

  return (
    <Tab2Provider>
      <Typography variant="h5" gutterBottom>
        {data.cityName}
      </Typography>

      <InputFields />

      <Box my={3}>
        <Divider />
      </Box>

      <Typography variant="h5">Результат</Typography>

      <ResultFields />
    </Tab2Provider>
  );
}
