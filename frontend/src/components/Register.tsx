import {useState} from "react";
import {checkPw, register} from "../services/RegisterService";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [equalPassword, setEqualPassword] = useState(true);

    const checkIfPasswordsAreTheSame = (event: string) => {
        if (password !== event) {
            setEqualPassword(false);
        } else setEqualPassword(true);
    }

    const passwordRegexp = (password: string) => {
        if (password.length < 8) return false;
        const hasUpperCase = /[A-Z]/.test(password);
        console.log(hasUpperCase);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasNonalphas = /[!@#$&*]/.test(password);
        return (hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas);
    }

    const handleSubmit = async () => {
        if (!passwordRegexp(password)) {
            alert(
                "bad password!" +
                "\n" +
                "password probably does not contain a minimum of 8 characters, 1 capital letter, 1 special characters or a number");
            return;
        }
        if (await checkPw(password)) {
            alert('password is found in the most common passwords list')
            return;
        }

        if (password === '' || email === '' || name === '') {
            alert('not all input fields are filled in')
            return;
        } else if (await register(name, email, password)) {
            alert('registration successful');
            window.location.replace('http://localhost:3000/login');
        } else {
            alert('there is already an account with this email')
        }
    }

    return <>
        <section className="vh-100 bg-image">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{borderRadius: '15px'}}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                                    <form>

                                        <div className="form-outline mb-4">
                                            <input onChange={e => setName(e.target.value)} type="text"
                                                   id="form3Example1cg"
                                                   className="form-control form-control-lg"/>
                                            <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input onChange={e => setEmail(e.target.value)} type="email"
                                                   id="form3Example3cg"
                                                   className="form-control form-control-lg"/>
                                            <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input onChange={e => {
                                                setPassword(e.target.value)
                                            }} type="password"
                                                   id="form3Example4cg"
                                                   className="form-control form-control-lg"/>
                                            <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input onChange={e => checkIfPasswordsAreTheSame(e.target.value)}
                                                   type="password" id="form3Example4cdg"
                                                   className="form-control form-control-lg"/>
                                            <label className="form-label" htmlFor="form3Example4cdg">Repeat your
                                                password</label>
                                        </div>
                                        {!equalPassword &&
                                            <p style={{color: "red"}}>password are not the same</p>
                                        }
                                        <div className="d-flex justify-content-center">
                                            <button onClick={handleSubmit} type="button"
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register
                                            </button>
                                        </div>

                                        <p className="text-center text-muted mt-5 mb-0">Have already an account? <a
                                            href="http://localhost:3000/login"
                                            className="fw-bold text-body"><u>Login here</u></a></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    </>
}

export default Register;
