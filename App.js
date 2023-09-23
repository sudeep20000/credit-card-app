import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App() {
  return (
    <div className="main">
      <div className="left">
      </div>
      <div className="right">
        <Form />
      </div>
    </div>
  )
}

function Front({ userName, accNum, mon, annul }) {
  let name = userName.toUpperCase();
  return (
    <div className="front">
      <div className="circles">
        <div className="circle1"></div>
        <div className="circle2"></div>
      </div>
      <div className="card-num">{accNum ? accNum : '0000 0000 0000 0000'}</div>
      <div className="holderName">
        <div className="userName">{userName ? name : 'JANE APPLESEED'}</div>
        <div className="expDate">{mon && annul ? `${mon}/${annul}` : '00/00'}</div>
      </div>
    </div>
  );
}

function Back({ cv }) {
  return (
    <div className="back">
      <span className="cvcIp">{cv ? cv : '000'}</span>
    </div>
  );
}

function Form() {
  const [name, setName] = useState('');
  const [accNo, setAccNo] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [error, setError] = useState(false);

  const notify = () => {
    if (name && accNo.length === 19 && Number(month) <= 12 && year && cvc.length === 3) {
      toast.success("successfully submitted.", { position: "top-center" });
    }
    else {
      toast.error("please fill all section correctly.", { position: "top-center" });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length === 0 || accNo.length === 0 || accNo.length < 16 || month.length === 0 || Number(month) > 12 || year.length === 0 || cvc.length === 0 || cvc.length < 3) {
      setError(true);
    }
    setName('');
    setAccNo('');
    setMonth('');
    setYear('');
    setCvc('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="holder-name">
        <p className="title">CARDHOLDER NAME</p>
        <div className="name">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Jane Appleseed"
            type="text"
            name="myName" />
        </div>
        {error && name.length === 0 ? <label>Cardholder Name can't be empty</label> : ""}
      </div>

      <div className="card-number">
        <p className="title">CARD NUMBER</p>
        <div className="number">
          <input
            value={accNo.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim()}
            onChange={e => setAccNo(e.target.value)}
            placeholder="e.g. 1111 2222 3333 4444"
            type="text"
            maxLength={19}
            name="myRole" />
        </div>
        {error && accNo.length < 16 && accNo.length > 1 ? <label>Card Number must containe 16 digits</label> : ""}
        {error && accNo.length === 0 ? <label>Card Number can't be empty</label> : ""}
      </div>

      <div className="exp-cvc">
        <div className="exp">
          <p className="title">EXP. DATE (MM/YY)</p>
          <div className="input-sec">
            <div className="month">
              <input
                value={month}
                onChange={e => setMonth(e.target.value)}
                placeholder="MM"
                type="text"
                maxLength={2}
                name="month" />
              {error && month.length === 0 ? <label>Month required</label> : ""}
              {error && Number(month) > 12 ? <label>Range(1-12)</label> : ""}
            </div>

            <div className="year">
              <input
                value={year}
                onChange={e => setYear(e.target.value)}
                placeholder="YY"
                type="text"
                maxLength={2}
                name="year" />
              {error && year.length === 0 ? <label>Year required</label> : ""}
            </div>
          </div>
        </div>

        <div className="cvc">
          <p className="title">CVC</p>
          <div className="cvc-no">
            <input
              value={cvc}
              onChange={e => setCvc(e.target.value)}
              placeholder="e.g. 123"
              type="text"
              maxLength={3}
              name="cvc-num" />
          </div>
          {error && cvc.length < 3 && cvc.length > 1 ? <label>CVC must be 3 digits</label> : ""}
          {error && cvc.length === 0 ? <label>CVC Required</label> : ""}
        </div>
      </div>

      <button onClick={notify} className="btn">Confirm</button>
      <ToastContainer />

      <Front userName={name}
        accNum={accNo}
        mon={month}
        annul={year} />

      <Back cv={cvc} />
    </form>
  );
}