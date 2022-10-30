import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./styles.css";

const initialValues = {
    gender: "male",
    skills: {
        javascript: true,
        react: false,
        nodejs: false,
        angular: false
    }
}

export default function App() {
    // ##### This comes directly from the react-hook-form library #####
    // ##### This also sets the intial settings when the page first loads #####
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            gender: initialValues.gender,
            skills: Object.keys(initialValues.skills).filter(
                (item) => initialValues.skills[item] === true
            )
        }
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email" 
                        // ##### This part of the code requires this field to be filled in. It also requires a certain pattern (for email) #####
                        // ##### Then follows the error messages that are displayed if the validation determines the user input is not in the correct expected format #####
                        {...register("email", {
                            required: "Please enter your email",
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: "Please enter a valid email"
                            }
                        })} 
                    />
                    {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                </Form.Group>

                <Form.Group className="mb3" controlId="gender">
                    <Form.Label>Select Gender</Form.Label>
                    <Form.Check
                        type="radio"
                        label="Male"
                        value="male"
                        {...register("gender", {
                            required: "Please select your gender",
                        })}
                    />
                    <Form.Check
                        type="radio"
                        label="Female"
                        value="female"
                        {...register("gender")}
                    />
                    {errors.gender && <p className="errorMsg">{errors.gender.message}</p>}
                </Form.Group>

                <Form.Group className="mb3" controlId="skills">
                    <Form.Label>Select Your Skills</Form.Label>
                    <Form.Check
                        type="checkbox"
                        label="Javascript"
                        value="javascript"
                        {...register("skills", {
                            required: "Please select at least one skill",
                        })}
                    />
                    <Form.Check
                        type="checkbox"
                        label="React"
                        value="react"
                        {...register("skills")}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Node.js"
                        value="nodejs"
                        {...register("skills")}
                    />
                    <Form.Check
                        type="checkbox"
                        label="Angular"
                        value="angular"
                        {...register("skills")}
                    />
                    {errors.skills && <p className="errorMsg">{errors.skills.message}</p>}
                </Form.Group>

                <div className="form-control">
                    <label></label>
                    <button type="submit" variant="primary">Login</button>
                </div>
            </form>
        </div>
    )
}