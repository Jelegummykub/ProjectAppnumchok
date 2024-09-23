import { useState } from 'react';
import Birthnumber from '../storage/birthdaynumber.json';
import Goodbad from '../storage/goodbad.json';
import Meannumber from '../storage/meannumber.json';
import './component.css';
import Info from './info';
import Navbar from './Nav';

function Num() {
    const [selectedMethod, setSelectedMethod] = useState("");
    const [houseno, setHouseno] = useState("");
    const [data, setData] = useState([]);
    const [resultData, setResultData] = useState(null);
    const [resultDataBirth, setResultDataBirth] = useState(null);
    const [resultDataGD, setResultDataGD] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [showinfo, setinfo] = useState(false)


    const Calnum = (housetext) => {
        let sum = 0;

        for (let i = 0; i < housetext.length; i++) {
            let temp = housetext[i]
            if (!isNaN(parseInt(temp))) {
                sum += parseInt(temp)

            }
        }
        // console.log(sum)
        let sum1 = sum.toString()
        let resum = 0
        for (let i = 0; i < sum1.length; i++) {
            let temp1 = sum1[i]
            if (!isNaN(parseInt(temp1))) {
                resum += parseInt(temp1)
                while (resum >= 10) {
                    resum = parseInt(resum / 10 + resum % 10)
                }
            }
        }
        // console.log(resum)
        // results.push({ houseno: resum });

        setData([{ houseno: resum }]);
        return resum;
    }

    const GoodBad = (housetext) => {

        for (let i = 0; i < housetext.length - 1; i++) {
            let temp = housetext[i] + housetext[i + 1]
            // console.log(temp)
            let temp32 = Goodbad.data.find(item => item.number.includes(temp))
            if (temp32) {
                return temp32.msg;
            }
        }
        return "ไม่มีเลขคู่ที่พิเศษ"
    }

    const handleSelectChange = (event) => {
        setSelectedMethod(event.target.value);
    }

    const inputhouseno = (event) => {
        setHouseno(event.target.value);
    }
    const isValidHouseNo = (housetext) => /^[0-9]/.test(housetext);
    const isValidselect = (selecteday) => {
        return selecteday && selecteday.trim() !== "";
    }
    const calculateNum = () => {
        if (!isValidHouseNo(houseno)) {
            setErrorMessage("กรุณากรอกบ้านเลขที่ให้ถูกต้อง สามารถกรอกได้เฉพาะตัวเลขและ /")
            return
        }

        if (!isValidselect(selectedMethod)) {
            setErrorMessage("กรุณาเลือกวันเกิดของท่าน");
            return;
        }

        setErrorMessage("");

        const result = Calnum(houseno)
        const regoodbad = GoodBad(houseno)
        // console.log(result);
        const selectedDay = Birthnumber.data.find(day => day.key === selectedMethod)
        // console.log(selectedDay)

        if (result < Meannumber.data.length) {
            setResultData(Meannumber.data[result])
            const Results = selectedDay.msg.filter(item => item.key.includes(result))
            console.log(Results)
            setResultDataBirth(Results)
            setResultDataGD(regoodbad)
            setinfo(true)
        } else {
            setResultData(null)
            setResultDataBirth(null)
            setResultDataGD(null)
            setinfo(false)
        }
    }

    return (
        <>
            <Navbar />
            <div className='container1'>
                <div className='inputEquationbi'>
                    <h1>บ้านเลขที่</h1>
                    <div className='input1'>
                        <input
                            type="text"
                            value={houseno}
                            onChange={inputhouseno}
                            placeholder="กรุณากรอกบ้านเลขที่ของท่าน"
                        />
                    </div>
                </div>
                <div className='inputxlbi'>
                    <div className='input-group'>
                        <div className='select-container'>
                            <div className="select-row">
                                <h1>วันเกิดของท่าน</h1>
                                <select id="comboBox1" value={selectedMethod} onChange={handleSelectChange}>
                                    <option value="">กรุณาเลือกวันเกิดของท่าน</option>
                                    <option value="วันจันทร์">วันจันทร์</option>
                                    <option value="วันอังคาร">วันอังคาร</option>
                                    <option value="วันพุธกลางวัน">วันพุธกลางวัน</option>
                                    <option value="วันพุธกลางคืน">วันพุธกลางคืน</option>
                                    <option value="วันพฤหัสบดี">วันพฤหัสบดี</option>
                                    <option value="วันศุกร์">วันศุกร์</option>
                                    <option value="วันเสาร์">วันเสาร์</option>
                                    <option value="วันอาทิตย์">วันอาทิตย์</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='calbi'>
                    <button className="btn btn-neutral btn-sm" onClick={calculateNum}>
                        คำนวณ
                    </button>
                </div>
                <div>
                    {errorMessage && (
                        <div className='error-message'>

                            <div role="alert" className="alert alert-warning">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span>{errorMessage}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    {data.length > 0 && (
                        <div className='result-container'>
                            <label>เลขมงคลของท่าน :</label>
                            <ul>
                                {data.map((element, index) => (
                                    <li key={index}>{element.houseno}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div>
                    {resultDataBirth && (
                        <div className='json-result'>
                            <label>เลขประจำวันของท่าน :</label>
                            {resultDataBirth.map((item, index) => (
                                <li key={index}>คือเลข : {item.number}</li>
                            ))}
                            <label>เลขที่บ้านมงคลถูกตามโฉลกวันเกิด : </label>
                            {resultDataBirth.map((item, index) => (
                                <li key={index}>{item.msg}</li>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    {resultData && (
                        <div className='json-result'>
                            <label>ความหมาย : </label>
                            <li>{resultData.msg}</li>
                            <label>อาชีพที่เหมาะสม : </label>
                            <li>{resultData.job}</li>
                            <label>คำแนะนำ : </label>
                            {resultData.recommend.map((rec, index) => (
                                <li key={index}>{rec}</li>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <div className='json-result'>
                        {resultDataGD &&
                            <>
                                <label>เลขคู่ของบ้านเลขที่ของคุณ :</label>
                                <li>ผลลัพธ์: {resultDataGD}</li>
                            </>
                        }
                    </div>

                </div>
            </div>
            <div>
                {showinfo && (
                    <Info />
                )}

            </div>

        </>
    );
}

export default Num;