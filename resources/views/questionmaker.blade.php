<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form</title>
  <style>
    .container {
      width: 500px;
      max-width: 100%;
    }

    .form-group {
      margin-bottom: 12px;
    }

    label {
      display: block;
      margin-bottom: 4px;
    }

    input {
      border: 1px solid #ccc;
    }

    input,
    .ql-editor {
      padding: 4px;
      font-size: 14px;
    }

    #editor {
      height: 130px;
    }
  </style>
</head>
<body>
  <link rel="stylesheet" href="/index.css" />
  <div class="container">
    <form action="https://httpbin.org/post" method="post">
      <div class="form-group">
        <label for="name">Display name</label>
        <input id="name" name="name" type="text">
      </div>
      <div class="form-group">
        <label for="location">Location</label>
        <input id="location" name="location" type="text">
      </div>
      <div class="form-group">
        <label>About me</label>
        <div id="editor"></div>
      </div>
      <button type="submit">Submit Form</button>
      <button type="button" id="resetForm">Reset to Initial Data</button>
    </form>
  </div>

  <script>
    const initialData = {
      name: 'Wall-E is not dead',
      location: 'Earth',
      // `about` is a Delta object
      // Learn more at: https://quilljs.com/docs/delta
      about: [
        {
          insert:
            'A robot who has developed sentience, and is the only robot of his kind shown to be still functioning on Earth.\n',
        },
      ],
    };

    const quill = new Quill('#editor', {
      modules: {
        toolbar: [
          ['bold', 'italic'],
          ['link', 'blockquote', 'code-block', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
        ],
      },
      theme: 'snow',
    });

    const resetForm = () => {
      document.querySelector('[name="name"]').value = initialData.name;
      document.querySelector('[name="location"]').value = initialData.location;
      quill.setContents(initialData.about);
    };

    resetForm();

    const form = document.querySelector('form');
    form.addEventListener('formdata', (event) => {
      // Append Quill content before submitting
      event.formData.append('about', JSON.stringify(quill.getContents().ops));
    });

    document.querySelector('#resetForm').addEventListener('click', () => {
      resetForm();
    });
  </script>
</body>
</html>
