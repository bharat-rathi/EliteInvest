const axios = require('axios');
const xml2js = require('xml2js');
const { sequelize, Entity, Filing } = require('../models');
require('dotenv').config();

// SEC RSS Feed for latest Form 4 (Insider Trading)
const SEC_RSS_URL = 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcurrent&type=4&company=&dateb=&owner=include&start=0&count=100&output=atom';

const parser = new xml2js.Parser({ explicitArray: false });

const ingestRealData = async () => {
  try {
    console.log('Fetching data from SEC EDGAR...');
    const response = await axios.get(SEC_RSS_URL, {
      headers: {
        'User-Agent': 'EliteInvest bot@eliteinvest.com', // SEC requires User-Agent
      },
    });

    const result = await parser.parseStringPromise(response.data);
    const entries = result.feed.entry;

    if (!entries) {
      console.log('No entries found.');
      return;
    }

    // Ensure entries is an array (xml2js might return object if only 1 entry)
    const filings = Array.isArray(entries) ? entries : [entries];

    console.log(`Found ${filings.length} filings. Processing...`);

    for (const entry of filings) {
      // Entry format example:
      // <title>4 - Musk Elon (0001494730) (Reporting)</title>
      // <link href="..." />
      // <updated>2023-10-01T...</updated>
      
      const title = entry.title;
      const link = entry.link['$'].href;
      const date = entry.updated.split('T')[0];
      
      // Parse Title to get Name and Ticker/CIK
      // Format usually: "4 - Sender Name (CIK) (Subject)"
      // Let's rely on a regex to extract Name
      const nameMatch = title.match(/4 - (.+?) \(/);
      const name = nameMatch ? nameMatch[1] : 'Unknown Entity';

      // Parse Transaction (Very basic for now)
      // We will default to 'insider_trade' since we requested Type 4
      
      // 1. Find or Create Entity
      const [entity] = await Entity.findOrCreate({
        where: { name: name },
        defaults: {
          type: 'insider',
          description: `Imported from SEC. CIK: ${title.match(/\((.*?)\)/)?.[1] || 'N/A'}`,
        },
      });

      // 2. Check if filing exists (deduplicate by source_url)
      const existingFiling = await Filing.findOne({ where: { source_url: link } });

      if (!existingFiling) {
        await Filing.create({
          entity_id: entity.id,
          filing_type: '4',
          date: date,
          ticker: 'Unknown', // Hard to get ticker from RSS feed title, usually just Company Name or CIK
          transaction_type: 'insider_activity', // Generic for now
          amount: 0, // Would need deep parsing
          price: 0,
          volume: 0,
          source_url: link,
        });
        console.log(`Saved filing for ${name}`);
      }
    }

    console.log('Ingestion complete!');
    process.exit(0);

  } catch (error) {
    console.error('Error ingesting data:', error);
    process.exit(1);
  }
};

ingestRealData();
