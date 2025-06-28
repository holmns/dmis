# MWIT DMIS Automation

This project automates the DMIS system at Mahidol Wittayanusorn School (MWIT), which is used as a digital gate pass for students going in and out of school.

## Features

- Automates login to the DMIS system
- Submits gate pass requests
- Supports specifying custom reason for going out

## Setup

1. Install required dependencies:

   ```bash
   npm install
   ```

2. Compile the TypeScript code:

   ```bash
   tsc
   ```

3. Run the automation script:
   ```bash
   npm run start
   ```

## Options

You can pass additional flags using `--`:

- `-h`  
  Indicates you are going **home** instead of just going out.
- `-r '<reason>'`  
  Provide a **custom reason** for going out (defaults to `"กินข้าว"`).

### Example:

```bash
npm run start -- -r "ไปเที่ยว"
```

---

Developed for educational automation purposes. Not affiliated with MWIT.
