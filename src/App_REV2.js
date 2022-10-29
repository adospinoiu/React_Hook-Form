import React from "react";
import { useForm } from "react-hook-form";
import "./styles.css";

export default function App() {
    // ##### This comes directly from the react-hook-form library #####
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email" 
                        // ##### This part of the code requires this field to be filled in. It also requires a certain pattern (for email) #####
                        // ##### Then follows the error messages that are displayed if the validation determines the user input is not in the correct expected format #####
                        // ##### This has been refactored from REV_1 and also includes additional validation tests #####
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: "Email is not valid"
                            }
                        })} 
                    />
                    {errors.email && (<p className="errorMsg">{errors.email.message}</p>)}
                </div>

                <div className="form-control">
                    <label>Password</label>
                    <input
                        type="text"
                        name="password"
                        // ##### This part of the code requires this field to be filled in. It also requires a certain pattern (for email) #####
                        // ##### Then follows the error messages that are displayed if the validation determines the user input is not in the correct expected format #####
                        // ##### This has been refactored from REV_1 and also includes additional validation tests ##### 
                        {...register("password", {
                            required: true,
                            validate: {
                                checkLength: (value) => value.length >= 6,
                                matchPattern: (value) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)
                            }
                        })}
                    />
                    {errors.password?.type === "required" && ( 
                        <p className="errorMsg">Password is required</p>
                    )}
                    {errors.password?.type === "checkLength" && ( 
                        <p className="errorMsg">Password should be at least 6 characters</p>
                    )}
                    {errors.password?.type === "matchPattern" && ( 
                        <p className="errorMsg">Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol</p>
                    )}
                </div>

                <div className="form-control">
                    <label></label>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}