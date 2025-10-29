/* eslint-disable lingui/no-single-variables-to-translate */
import { zodResolver } from "@hookform/resolvers/zod";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";
import { XIcon } from "@phosphor-icons/react";
import {
  defaultExperience,
  employmentTypeEnum,
  experienceSchema,
  workTypeEnum,
} from "@reactive-resume/schema";
import {
  Badge,
  BadgeInput,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RichInput,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@reactive-resume/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { AiActions } from "@/client/components/ai-actions";
import { getEmploymentTypeLabels, getWorkTypeLabels } from "@/client/locales/enums";

import { SectionDialog } from "../sections/shared/section-dialog";
import { URLInput } from "../sections/shared/url-input";

const formSchema = experienceSchema;
const MAX_DESCRIPTION_LENGTH = 49;

type FormValues = z.infer<typeof formSchema>;

const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
};

export const ExperienceDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultExperience,
    resolver: zodResolver(formSchema),
  });

  const [pendingKeyword, setPendingKeyword] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDrop = (
    e: React.DragEvent,
    dropIndex: number,
    field: { value: string[]; onChange: (value: string[]) => void },
  ) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newItems = [...field.value];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);

    field.onChange(newItems);
    setDraggedIndex(null);
  };

  return (
    <SectionDialog<FormValues>
      id="experience"
      form={form}
      defaultValues={defaultExperience}
      pendingKeyword={pendingKeyword}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="company"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Company`}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="position"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t({
                  message: "Position",
                  context: "Position held at a company, for example, Software Engineer",
                })}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Date or Date Range`}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t`March 2023 - Present`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="location"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Location`}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t`Heidelberg, Germany`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="employmentType"
          control={form.control}
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>{t`Employment Type`}</FormLabel>
              <FormControl>
                <Select {...field} value={field.value ?? "none"} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={t`Select Employment Type`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {employmentTypeEnum.options.map((type) => (
                        // eslint-disable-next-line react/jsx-no-comment-textnodes
                        <SelectItem key={type} value={type}>
                          {i18n._(getEmploymentTypeLabels()[type])}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />

              {/* Show input when "Other" is selected */}
              {field.value === "other" && (
                <FormField
                  name="customEmploymentType"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="pt-2">
                      <FormLabel>{t`Specify Other Employment Type`}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={typeof field.value === "string" ? field.value : ""}
                          placeholder={t`Enter custom employment type`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </FormItem>
          )}
        />

        <FormField
          name="workType"
          control={form.control}
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>{t`Work Type`}</FormLabel>
              <FormControl>
                <Select {...field} value={field.value ?? "none"} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={t`Select Work Type`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {workTypeEnum.options.map((type) => (
                        // eslint-disable-next-line react/jsx-no-comment-textnodes
                        <SelectItem key={type} value={type}>
                          {i18n._(getWorkTypeLabels()[type])}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />

              {/* Show input when "Other" is selected */}
              {field.value === "other" && (
                <FormField
                  name="customWorkType"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="pt-2">
                      <FormLabel>{t`Specify Other Work Type`}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={typeof field.value === "string" ? field.value : ""}
                          placeholder={t`Enter custom Work type`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </FormItem>
          )}
        />

        <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Website`}</FormLabel>
              <FormControl>
                <URLInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="companyDescription"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>
                <div className="flex w-full items-center justify-between">
                  <span>{t`Company Description`}</span>
                  <span>
                    {field.value?.length ?? 0}/{MAX_DESCRIPTION_LENGTH}
                  </span>
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  {...field} placeholder={t`Enter a short description about the company`}
                  maxLength={MAX_DESCRIPTION_LENGTH}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_DESCRIPTION_LENGTH) {
                      field.onChange(e.target.value);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="overview"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Overview`}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t`Enter a short overview about this work experience`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="industries"
          control={form.control}
          render={({ field }) => (
            <div className="col-span-2 space-y-3">
              <FormItem>
                <FormLabel>{t`Industries`}</FormLabel>
                <FormControl>
                  <BadgeInput {...field} setPendingKeyword={setPendingKeyword} />
                </FormControl>
                <FormDescription>
                  {t`You can add multiple industries by separating them with a comma or pressing enter.`}
                </FormDescription>
                <FormMessage />
              </FormItem>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                <AnimatePresence>
                  {field.value.map((item, index) => (
                    <motion.div
                      key={item}
                      layout
                      draggable
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                      exit={{ opacity: 0, x: -50 }}
                      onDragStart={() => {
                        setDraggedIndex(index);
                      }}
                      onDragOver={handleDragOver}
                      onDrop={(e) => {
                        handleDrop(e, index, field);
                      }}
                    >
                      <Badge
                        className="cursor-pointer"
                        onClick={() => {
                          field.onChange(field.value.filter((v) => item !== v));
                        }}
                      >
                        <span className="mr-1">{item}</span>
                        <XIcon size={12} weight="bold" />
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        />

        <FormField
          name="specialities"
          control={form.control}
          render={({ field }) => (
            <div className="col-span-2 space-y-3">
              <FormItem>
                <FormLabel>{t`Specialities`}</FormLabel>
                <FormControl>
                  <BadgeInput {...field} setPendingKeyword={setPendingKeyword} />
                </FormControl>
                <FormDescription>
                  {t`You can add multiple specialities by separating them with a comma or pressing enter.`}
                </FormDescription>
                <FormMessage />
              </FormItem>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                <AnimatePresence>
                  {field.value.map((item, index) => (
                    <motion.div
                      key={item}
                      layout
                      draggable
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                      exit={{ opacity: 0, x: -50 }}
                      onDragStart={() => {
                        setDraggedIndex(index);
                      }}
                      onDragOver={handleDragOver}
                      onDrop={(e) => {
                        handleDrop(e, index, field);
                      }}
                    >
                      <Badge
                        className="cursor-pointer"
                        onClick={() => {
                          field.onChange(field.value.filter((v) => item !== v));
                        }}
                      >
                        <span className="mr-1">{item}</span>
                        <XIcon size={12} weight="bold" />
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        />

        <FormField
          name="summary"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Summary`}</FormLabel>
              <FormControl>
                <RichInput
                  {...field}
                  content={field.value}
                  footer={(editor) => (
                    <AiActions
                      value={editor.getText()}
                      onChange={(value) => {
                        editor.commands.setContent(value, true);
                        field.onChange(value);
                      }}
                    />
                  )}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="tags"
          control={form.control}
          render={({ field }) => (
            <div className="col-span-2 space-y-3">
              <FormItem>
                <FormLabel>{t`Tags`}</FormLabel>
                <FormControl>
                  <BadgeInput {...field} setPendingKeyword={setPendingKeyword} />
                </FormControl>
                <FormDescription>
                  {t`You can add multiple tags by separating them with a comma or pressing enter.`}
                </FormDescription>
                <FormMessage />
              </FormItem>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                <AnimatePresence>
                  {field.value.map((item, index) => (
                    <motion.div
                      key={item}
                      layout
                      draggable
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                      exit={{ opacity: 0, x: -50 }}
                      onDragStart={() => {
                        setDraggedIndex(index);
                      }}
                      onDragOver={handleDragOver}
                      onDrop={(e) => {
                        handleDrop(e, index, field);
                      }}
                    >
                      <Badge
                        className="cursor-pointer"
                        onClick={() => {
                          field.onChange(field.value.filter((v) => item !== v));
                        }}
                      >
                        <span className="mr-1">{item}</span>
                        <XIcon size={12} weight="bold" />
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        />
      </div>
    </SectionDialog>
  );
};
