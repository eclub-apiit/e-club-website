// Maintainer utility. Question data belongs on the database, not in public/.
import {readFile,writeFile} from 'node:fs/promises';
const bank=JSON.parse(await readFile(new URL('./content/questions.json',import.meta.url),'utf8'));
const quote=value=>"'"+String(value).replaceAll("'","''")+"'";
const rows=bank.map(q=>'('+[q.id,q.game,q.difficulty,q.title,JSON.stringify(q.answers),q.explanation,q.source||'',JSON.stringify(q.public_data)].map(quote).join(',')+')');
const sql=`-- Private question bank. Run after 001_summit_games.sql.\nbegin;\ninsert into summit_game_private.questions(id,game,difficulty,title,answers,explanation,source,public_data) values\n${rows.join(',\n')}\non conflict(id) do update set game=excluded.game,difficulty=excluded.difficulty,title=excluded.title,answers=excluded.answers,explanation=excluded.explanation,source=excluded.source,public_data=excluded.public_data;\ncommit;\n`;
await writeFile(new URL('./migrations/002_summit_game_questions.sql',import.meta.url),sql);
console.log(`Generated private SQL for ${bank.length} questions.`);
