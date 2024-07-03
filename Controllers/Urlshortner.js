import shortid from "shortid";
import url from "../Models/Urlmodel.js";

export const createurl = async (req, res) => {
  try {
    const body = req.body;
    // console.log(body);
    
    if (!body.url) {
      return res.status(400).send(" url is required");
    }

    const shortID = shortid();
    // console.log(shortID);

     const ccc = await url.create(
      {
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
      }
     );

    res.status(200).json({ id: shortID });

    // res.status(200).json({ link:`http://localhost:5000/api/url/${shortID}` });
    
  } catch (error) {
    console.log(error);
    res.status(500).send("error occured while creating url");
  }
 
};



export const geturl = async (req, res) => {
  try {
    const shortId = req.params.shortid;
    console.log(shortId);
    const entry = await url.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    console.log(entry);
    
    res.redirect(entry.redirectURL);
  } catch (error) {
    res.status(500).send("error occured while getting the url");
  }
};

export const visitcount = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    console.log(shortId);
    const result = await url.findOne({ shortId });
    console.log(result);
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    res.status(500).send("error occured while getting visitcount");
  }
};
