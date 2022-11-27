import React from "react";

interface fields {
	label: string;
	name: string;
	autocomplete: string;
	autofocus: boolean;
	type: string;
}

interface IFormProps {
	formFields: Array<fields>;
	headerText: string;
	buttonText: string;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default IFormProps;
