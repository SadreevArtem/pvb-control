import Link from 'next/link';
import {useRouter} from 'next/router';
import {useTranslations} from 'next-intl';
import clsx from 'clsx';

export default function LocaleSwitcher({className}: {className: string}) {
  const t = useTranslations('LocaleSwitcher');

  const {locale, locales, route} = useRouter();
  const otherLocale = locales?.find((cur) => cur !== locale);

  return (
    <Link href={route} locale={otherLocale} className={clsx('text-primary self-end', className)}>
      {t('switchLocale', {locale: otherLocale})}
    </Link>
  );
}