import { statusCodes, statusMessages } from './constants';

const log = string => {
  process.stdout.write(`${string}\n`);
};

const connectionMessage = port => {
  log(`Server started on port ${port}`);
};

const catchAllError = app =>
  app.use('*', (req, res) =>
    res.status(404).send({
      status: statusCodes.badRequest,
      message: statusMessages.routeNotFound(req),
    }));

const slugify = str => {
  const specialCharacters = 'ąàáäâãåæćęęèéëêìíïîłńòóöôõøśùúüûñçżź';
  const replacement = 'aaaaaaaaceeeeeeiiiilnoooooosuuuunczz';
  const regex = new RegExp(
    `[${specialCharacters.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1')}]`,
    'g'
  );

  if (!str) return '';

  str = String(str)
    .toLowerCase()
    .replace(regex, char => replacement.charAt(specialCharacters.indexOf(char)) || '-');

  return str
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export {
  log,
  connectionMessage,
  catchAllError,
  slugify
};
