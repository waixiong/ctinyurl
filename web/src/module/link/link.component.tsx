import { useCreateLink } from "./link.query";
import { Button, TextField, Typography } from "@material-ui/core";
import { useState } from "react";

export function CreateLinkWidget() {
  const create = useCreateLink();

  const [url, setUrl] = useState('');
  const [response, setResponse] = useState('');

  function handleSubmit(event: any) {
    event.preventDefault();
    create.mutate({
      url: url
    }, {
      onSuccess: (result) => {
        setResponse(`short link: ${
          process.env.REACT_APP_API_URL===undefined
              ? 'http://vexsdev.getitqec.com'
              :process.env.REACT_APP_API_URL}/${result.id}`
        );
      },
      onError: (e) => {
        console.error(e);
      },
    });
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} >
          <TextField
            label="URL" variant="filled"
            value={url}
            onChange={ e => setUrl(e.target.value)}
          />
          <Typography/>
          <Button type="submit" variant="contained" disabled={create.isLoading}>
            create link
          </Button>
        </form>
      </div>
      {create.isLoading && (
        <div>
          creating...
        </div>
      )}
      {create.isSuccess && (
        <div>
          {response}
        </div>
      )}
      {create.isError && (
        <div>
          Error on create, { String(create.error) }
        </div>
      )}
    </>
  );
}
