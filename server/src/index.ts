import express from "express";
import cors from "cors";
import axios, { AxiosError } from "axios";

const app = express();

const apiUrl = "https://unreliable-payments-wappznbt3q-uc.a.run.app";

app.use(express.json());
app.use(cors());

app.get("/payments", async (req, nodeRes) => {
  const quertParams = req.query;
  try {
    const res = await axios(apiUrl + "/payments", {
      params: quertParams,
    });
    nodeRes.send(JSON.stringify(res.data));
  } catch (err: any) {
    console.log(err);
    nodeRes.status(500).send(err?.response?.data);
  }
});

app.get("/auth-tokens", async (req, nodeRes) => {
  try {
    const res = await axios.post(apiUrl + "/auth-tokens");
    nodeRes.send(JSON.stringify(res.data));
  } catch (err: any) {
    console.log(err);
    nodeRes.status(500).send(err?.response?.data);
  }
});

app.post("/payments", async (req, nodeRes) => {
  try {
    const quertParams = req.query;
    const res = await axios.post(apiUrl + "/payments", req.body, {
      params: quertParams,
    });
    nodeRes.send(JSON.stringify(res.data));
  } catch (err: any) {
    nodeRes.status(500).send(err?.response?.data);
  }
});

const server = app.listen(3333, () =>
  console.log(`🚀 Server ready at: http://localhost:3333`)
);
