import React, { useRef, FormEvent } from "react";
import { Input } from "@mui/base/Input";
import { Button } from "@mui/base/Button";
import "./InputField.css";
type InputFieldProps = {
  message: string;
  setMessage: (value: string) => void;
  sendMessage: (event: React.FormEvent<HTMLFormElement>) => void;
};

const InputField = ({ message, setMessage, sendMessage }: InputFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(event);
    setMessage("");
    inputRef.current?.focus();
  };
  return (
    <div className="input-area">
      <div className="plus-button">+</div>
      <form onSubmit={handleSubmit} className="input-container">
        <Input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          multiline={false}
        />
        <Button disabled={message === ""} type="submit" className="send-button">
          전송
        </Button>
      </form>
    </div>
  );
};

export default InputField;
