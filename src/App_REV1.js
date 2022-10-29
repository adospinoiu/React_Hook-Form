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
                        {...register("email", {
                            required: true,
                            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                        })} 
                    />
                    {errors.email && errors.email.type === "required" && (
                        <p className="errorMsg">Email is required</p>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                        <p className="errorMsg">Email is not valid</p>
                    )}
                </div>

                <div className="form-control">
                    <label>Password</label>
                    <input
                        type="text"
                        name="password"
                        // ##### This part of the code requires this field to be filled in. It also requires a certain pattern (for email) #####
                        // ##### Then follows the error messages that are displayed if the validation determines the user input is not in the correct expected format ##### 
                        {...register("password", {
                            required: true,
                            minLength: 6
                        })}
                    />
                    {errors.password && errors.password.type === "required" && (
                        <p className="errorMsg">Password is required</p>
                    )}
                    {errors.password && errors.password.type === "minLength" && (
                        <p className="errorMsg">Password should be at least 6 characters</p>
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