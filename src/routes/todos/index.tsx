import type { Session } from '@auth/core/types';
import { component$ } from '@builder.io/qwik';
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
  type DocumentHead,
  type RequestHandler,
} from '@builder.io/qwik-city';
import { useAuthSignout } from '../plugin@auth';
import styles from './todolist.module.css';

export default component$(() => {
  const list = useListLoader();
  const action = useAddToListAction();
  const signOut = useAuthSignout();
  return (
    <>
      <div class="container container-center">
        <h1>
          <span class="highlight">TODO</span> List
        </h1>
      </div>

      <div role="presentation" class="ellipsis"></div>

      <div class="container container-center">
        {list.value.length === 0 ? (
          <span class={styles.empty}>No items found</span>
        ) : (
          <ul class={styles.list}>
            {list.value.map((item, index) => (
              <li key={`items-${index}`}>{item.text}</li>
            ))}
          </ul>
        )}
      </div>

      <div class="container container-center">
        <Form action={action} spaReset>
          <input type="text" name="text" required class={styles.input} />{' '}
          <button type="submit" class="button-dark">
            Add item
          </button>
        </Form>
      </div>
      <Form
        action={signOut}
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <input type="hidden" name="callbackUrl" value="/" />
        <button class="submit">Logout</button>
      </Form>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Qwik Todo List',
};

interface ListItem {
  text: string;
}

export const onRequest: RequestHandler = async (event) => {
  const session: Session | null = event.sharedMap.get('session');
  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(
      302,
      `/api/auth/signin?callbackUrl=${event.url.pathname}`
    );
  }
};

const list: ListItem[] = [];

export const useListLoader = routeLoader$(() => {
  return list;
});

export const useAddToListAction = routeAction$(
  (item) => {
    list.push(item);
    return {
      success: true,
    };
  },
  zod$({
    text: z.string().trim().min(1),
  })
);
